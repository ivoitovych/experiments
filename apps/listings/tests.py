from decimal import Decimal
from unittest.mock import patch

from django.test import TestCase

from apps.listings.validators import check_profanity


class ProfanityValidatorTests(TestCase):
    def test_clean_text_passes(self):
        self.assertFalse(check_profanity('Продаю автомобіль в гарному стані'))

    def test_profanity_detected(self):
        self.assertTrue(check_profanity('Цей автомобіль хуйня повна'))

    def test_empty_text_passes(self):
        self.assertFalse(check_profanity(''))

    def test_mixed_case_detected(self):
        self.assertTrue(check_profanity('Це БЛЯТЬ крута тачка'))

    def test_multiple_profanity_words(self):
        self.assertTrue(check_profanity('сука блять'))

    def test_clean_ukrainian_text(self):
        self.assertFalse(check_profanity(
            'BMW X5 2020 року, дизель, автомат, шкіра, панорама, LED фари'
        ))
