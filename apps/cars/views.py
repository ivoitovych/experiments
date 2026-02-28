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

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated(), HasPermission('can_request_brand')()]
        if self.action in ('list', 'retrieve'):
            return [IsAuthenticated(), IsManagerOrAdmin()]
        if self.action == 'partial_update':
            return [IsAuthenticated(), IsAdmin()]
        return [IsAuthenticated(), IsAdmin()]
