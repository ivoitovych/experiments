import type { UserResponse } from '@/services/user/user.types';
import type { User } from '@/services/user/user.types';

export const mapUser = (user: UserResponse): User => ({
  id: user.id,
  email: user.email,
});
