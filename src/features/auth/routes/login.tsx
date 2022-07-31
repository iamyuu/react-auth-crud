import { Container, Heading, Paper, TextInput, PasswordInput, Button } from '~/components/ui';
import { toast } from '~/libs/toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '../providers/auth';
import { loginSchema, type LoginCredentialsDTO } from '../schemas/login';

export function LoginPage() {
	const { login } = useAuthContext();
	const { register, formState, handleSubmit } = useForm<LoginCredentialsDTO>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = handleSubmit(async formData => {
		try {
			await login(formData);
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Something went wrong :(';
			toast.error(reason);
		}
	});

	return (
		<Container my={40} size={420}>
			<Heading align='center' mb={30} sx={{ fontWeight: 900 }}>
				Welcome back!
			</Heading>

			<Paper
				component='form'
				onSubmit={onSubmit}
				p={30}
				shadow='md'
				sx={theme => ({
					'& > * + *': {
						marginTop: theme.spacing.md,
					},
				})}
			>
				<TextInput
					{...register('email')}
					error={formState.errors.email?.message}
					label='Email'
					placeholder='yusuf@iamyuu.dev'
					type='email'
				/>

				<PasswordInput
					{...register('password')}
					error={formState.errors.password?.message}
					label='Password'
					placeholder='secret'
				/>

				<Button fullWidth loading={formState.isSubmitting} type='submit'>
					Login
				</Button>
			</Paper>
		</Container>
	);
}
