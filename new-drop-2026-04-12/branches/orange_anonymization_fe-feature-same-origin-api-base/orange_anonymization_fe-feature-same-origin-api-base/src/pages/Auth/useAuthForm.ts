import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from './schema';
import { sendEmail } from '@/services/auth/auth.api';

export interface AuthFormValues {
  email: string;
}

export const useAuthForm = () => {
  const form = useForm<AuthFormValues>({
    resolver: yupResolver(authSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { email: '' },
  });

  const { register, handleSubmit, setError, clearErrors, trigger } = form;

  const onSubmit = async (data: AuthFormValues) => {
    try {
      await sendEmail(data.email);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError('email', { type: 'manual', message: errorMessage });
    }
  };

  return {
    ...form,
    register,
    handleSubmit,
    clearErrors,
    onSubmit,
    trigger,
  };
};
