from decimal import Decimal

from django.test import TestCase

from apps.currency.services import convert_price


class CurrencyConversionTests(TestCase):
    def setUp(self):
        self.rates = {
            'USD': Decimal('41.5000'),
            'EUR': Decimal('44.0000'),
        }

    def test_convert_from_usd(self):
        result = convert_price(10000, 'USD', self.rates)
        self.assertEqual(result['price_usd'], Decimal('10000.00'))
        self.assertEqual(result['price_uah'], Decimal('415000.00'))
        # 415000 / 44 = 9431.818... -> 9431.82
        self.assertEqual(result['price_eur'], Decimal('9431.82'))
        self.assertEqual(result['rate_usd_uah'], Decimal('41.5000'))
        self.assertEqual(result['rate_eur_uah'], Decimal('44.0000'))

    def test_convert_from_eur(self):
        result = convert_price(10000, 'EUR', self.rates)
        self.assertEqual(result['price_eur'], Decimal('10000.00'))
        self.assertEqual(result['price_uah'], Decimal('440000.00'))
        # 440000 / 41.5 = 10602.409... -> 10602.41
        self.assertEqual(result['price_usd'], Decimal('10602.41'))

    def test_convert_from_uah(self):
        result = convert_price(415000, 'UAH', self.rates)
        self.assertEqual(result['price_uah'], Decimal('415000.00'))
        self.assertEqual(result['price_usd'], Decimal('10000.00'))
        # 415000 / 44 = 9431.818... -> 9431.82
        self.assertEqual(result['price_eur'], Decimal('9431.82'))

    def test_unsupported_currency_raises(self):
        with self.assertRaises(ValueError):
            convert_price(10000, 'GBP', self.rates)

    def test_missing_rates_raises(self):
        with self.assertRaises(ValueError):
            convert_price(10000, 'USD', {'USD': None, 'EUR': None})
