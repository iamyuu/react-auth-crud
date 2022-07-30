import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary, Suspense } from '~/components/helpers';
import { ErrorFallback } from '~/components/ui/fallback/error-fallback';
import { AuthProvider } from '~/features/auth';
import { GlobalStyles } from '~/themes/styles';
import { overrideTheme } from '~/themes';
import { queryClient } from '~/libs/react-query';

const fullScreenStyles = {
	width: '100vw',
	height: '100vh',
};

export function AppProviders(props: React.PropsWithChildren) {
	return (
		<MantineProvider theme={overrideTheme} withGlobalStyles withNormalizeCSS>
			<GlobalStyles />

			<ErrorBoundary fallbackRender={errorProps => <ErrorFallback {...errorProps} sx={fullScreenStyles} />}>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools position='bottom-right' />

					<NotificationsProvider position='top-center'>
						<Suspense aria-label='Loading app' size='xl' sx={fullScreenStyles}>
							<AuthProvider>{props.children}</AuthProvider>
						</Suspense>
					</NotificationsProvider>
				</QueryClientProvider>
			</ErrorBoundary>
		</MantineProvider>
	);
}
