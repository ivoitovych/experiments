export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
}

export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}
