from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.roles.permissions import IsAdmin, IsManagerOrAdmin
from core.permissions import HasPermission
from .models import BrandRequest, CarBrand, CarModel
from .serializers import (
    BrandRequestSerializer,
    BrandRequestUpdateSerializer,
    CarBrandSerializer,
    CarModelSerializer,
)


class CarBrandViewSet(viewsets.ModelViewSet):
    queryset = CarBrand.objects.all()
    serializer_class = CarBrandSerializer

    @method_decorator(cache_page(60 * 60 * 24))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()
        _invalidate_car_caches()

    def perform_update(self, serializer):
        serializer.save()
        _invalidate_car_caches()

    def perform_destroy(self, instance):
        instance.delete()
        _invalidate_car_caches()

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsAuthenticated(), HasPermission('can_manage_brands')()]


class CarModelViewSet(viewsets.ModelViewSet):
    serializer_class = CarModelSerializer

    def get_queryset(self):
        return CarModel.objects.filter(brand_id=self.kwargs['brand_pk'])

    @method_decorator(cache_page(60 * 60 * 24))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(brand_id=self.kwargs['brand_pk'])
        _invalidate_car_caches()

    def perform_update(self, serializer):
        serializer.save()
        _invalidate_car_caches()

    def perform_destroy(self, instance):
        instance.delete()
        _invalidate_car_caches()

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [AllowAny()]
        return [IsAuthenticated(), HasPermission('can_manage_brands')()]


class BrandRequestViewSet(viewsets.ModelViewSet):
    queryset = BrandRequest.objects.select_related('user').all()

    def get_serializer_class(self):
        if self.action == 'partial_update':
            return BrandRequestUpdateSerializer
        return BrandRequestSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.save()
        # When approved, create the brand and model in the catalog
        if instance.status == 'approved':
            brand, _ = CarBrand.objects.get_or_create(
                name=instance.brand_name,
                defaults={'is_active': True},
            )
            if instance.model_name:
                CarModel.objects.get_or_create(
                    brand=brand,
                    name=instance.model_name,
                    defaults={'is_active': True},
                )
            # Invalidate brand/model list caches
            _invalidate_car_caches()

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated(), HasPermission('can_request_brand')()]
        if self.action in ('list', 'retrieve'):
            return [IsAuthenticated(), IsManagerOrAdmin()]
        if self.action == 'partial_update':
            return [IsAuthenticated(), IsAdmin()]
        return [IsAuthenticated(), IsAdmin()]


def _invalidate_car_caches():
    """Clear cached brand and model list responses."""
    # Django's cache_page uses keys based on URL + Vary headers.
    # The simplest reliable approach: clear the entire cache.
    # For a production system with many cache keys, use a versioned key prefix.
    cache.clear()
