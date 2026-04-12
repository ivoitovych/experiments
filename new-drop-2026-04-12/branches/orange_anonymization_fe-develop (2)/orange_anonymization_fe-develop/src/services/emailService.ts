import type { ContactFormData } from '@/pages/Contact/types';
import api from './api';

export const emailService = {
  async sendContactUsEmail(contactFormData: ContactFormData) {
    await api.post('/email/contact', contactFormData);
  },
};
