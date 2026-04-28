import * as yup from 'yup';
import { validationMessages } from './constants';

export const authSchema = yup.object({
  email: yup
    .string()
    .email(validationMessages.emailRequired)
    .required(validationMessages.emailRequired),
});
