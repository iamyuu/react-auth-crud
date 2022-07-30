import * as React from 'react';
import { createContext } from '~/utils/create-context';
import { useQueryClient } from '@tanstack/react-query';
import { loginWithEmailAndPassword } from '../services/login';
import { getSession, setSession, removeSession } from '../services/session';
import type { AuthUser } from '../types/session';
import type { LoginCredentialsDTO } from '../schemas/login';

interface AuthContextValue {
	isAuth: boolean;
	user?: AuthUser;
	logout: () => void;
	login: (formField: LoginCredentialsDTO) => Promise<void>;
}

const [useAuthContext, AuthInternalProvider] = createContext<AuthContextValue>({ name: 'Auth' });

export { useAuthContext };

export function AuthProvider(props: React.PropsWithChildren) {
	const queryClient = useQueryClient();
	const [user, setUser] = React.useState<AuthContextValue['user']>(() => getSession()?.user);

	async function login(formField: LoginCredentialsDTO) {
		const newSession = await loginWithEmailAndPassword(formField);

		setSession(newSession);
		setUser({
			name: newSession.user.name,
			email: newSession.user.email,
		});
	}

	function logout() {
		// remove cache after logout
		queryClient.clear();
		removeSession();

		setUser(undefined);
	}

	return (
		<AuthInternalProvider
			value={{
				isAuth: !!user,
				user,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthInternalProvider>
	);
}
