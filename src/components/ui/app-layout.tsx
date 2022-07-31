import { AppShell, Header, Text, ButtonIcon, Container, HStack } from '~/components/ui';
import { IconLogout } from '~/assets/icons';
import { useAuthContext } from '~/features/auth';

export function AppLayout(props: React.PropsWithChildren) {
	const { logout } = useAuthContext();

	return (
		<AppShell
			header={
				<Header height={56}>
					<Container>
						<HStack position='apart' py='sm'>
							<Text size='lg' weight={600}>
								Fakestore
							</Text>

							<ButtonIcon label='Logout' onClick={logout} size='md'>
								<IconLogout size={24} />
							</ButtonIcon>
						</HStack>
					</Container>
				</Header>
			}
			padding={0}
		>
			<Container
				my='xl'
				sx={theme => ({
					'& > * + *': {
						marginTop: theme.spacing.md,
					},
				})}
			>
				{props.children}
			</Container>
		</AppShell>
	);
}
