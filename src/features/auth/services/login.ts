import { http } from '~/utils/http';
import type { AuthSession } from '../types/session';
import type { LoginCredentialsDTO } from '../schemas/login';

export function loginWithEmailAndPassword(formData: LoginCredentialsDTO) {
	return http<AuthSession>('/auth/login', { data: formData });
}
