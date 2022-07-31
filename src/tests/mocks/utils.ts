import type { RestRequest } from 'msw';
import type { LoginCredentialsDTO } from './handlers/auth';
import { db } from './db';

export function hash(txt: string) {
	let hash = 5381; // eslint-disable-line @typescript-eslint/no-shadow
	let i = txt.length;

	while (i) {
		hash = (hash * 33) ^ txt.charCodeAt(--i); // eslint-disable-line no-bitwise
	}

	return String(hash >>> 0); // eslint-disable-line no-bitwise
}

function verifyJwt(authorizationHeader: string | null) {
	try {
		const token = authorizationHeader?.replace('Bearer ', '') ?? '';
		const [_jwtHeader, jwtPayload, _jwtSignature] = token.split('.');

		return JSON.parse(atob(jwtPayload)) as { name: string; email: string };
	} catch {
		return null;
	}
}

export function requireAuth(request: RestRequest) {
	const rawToken = request.headers.get('authorization');
	const decodedToken = verifyJwt(rawToken);

	if (!decodedToken) {
		throw new Error('Unauthorized');
	}

	return {
		name: decodedToken.name,
		email: decodedToken.email,
	};
}

export function authenticate(formData: LoginCredentialsDTO) {
	const user = db.user.findFirst({
		where: {
			email: {
				equals: formData.email,
			},
		},
	});

	if (user?.password === hash(formData.password)) {
		const encodedToken =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWXVzdWYiLCJlbWFpbCI6Inl1c3VmQGlhbXl1dS5kZXYifQ.eNNCAf-KJ8lYDqi5uW9-aY23aMWH83LqFlIKvvF3CO8';

		return {
			token: encodedToken,
			user: {
				name: user.name,
				email: user.email,
			},
		};
	}

	throw new Error('Invalid username or password');
}
