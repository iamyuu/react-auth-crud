import { rest } from 'msw';
import { API_URL } from '~/constants/env';
import { authenticate } from '../utils';

const namespace = `${API_URL}/auth`;

export interface LoginCredentialsDTO {
	email: string;
	password: string;
}

export const authHandlers = [
	rest.post(`${namespace}/login`, async (req, res, ctx) => {
		try {
			const formData = await req.json<LoginCredentialsDTO>();
			const result = authenticate(formData);

			return await res(ctx.json(result));
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Internal Server Error';
			const code = /invalid/i.test(reason) ? 400 : 500;

			return res(ctx.status(code), ctx.json({ message: reason }));
		}
	}),
];
