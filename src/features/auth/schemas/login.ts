import * as z from 'zod';

export const loginSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(1),
});

export type LoginCredentialsDTO = z.infer<typeof loginSchema>;
