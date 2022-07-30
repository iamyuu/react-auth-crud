import { rest } from 'msw';
import { API_URL } from '~/constants/env';

const namespace = `${API_URL}/auth`;

// hardcode the mock user to be able simulate "account doesn't exist"
const mockUser = {
	name: 'Yusuf',
	email: 'yusuf@iamyuu.dev',
	password: 'secret',
	jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyLCJuYW1lIjoiWXVzdWYiLCJlbWFpbCI6Inl1c3VmQGlhbXl1dS5kZXYifQ.ty8pF0-xss0BAdTVlE3jR3ZBQvT0pPr4xlrJGBThuxs',
};

export const authHandlers = [
	rest.post(`${namespace}/login`, async (req, res, ctx) => {
		const formData = await req.json<{ email: string; password: string }>();

		if (mockUser.email !== formData.email && mockUser.password !== formData.password) {
			return res(ctx.status(400), ctx.json({ message: `Can't find account` }));
		}

		return res(
			ctx.delay(1500),
			ctx.json({
				token: mockUser.jwt,
				user: {
					name: mockUser.name,
					email: mockUser.email,
				},
			}),
		);
	}),
];
