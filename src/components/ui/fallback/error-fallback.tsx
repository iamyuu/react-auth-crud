import type { FallbackProps } from 'react-error-boundary';
import { Alert, type AlertProps, Heading, Text } from '~/components/ui';

export type ErrorFallbackProps = FallbackProps & Pick<AlertProps, 'sx'>;

export function ErrorFallback(props: ErrorFallbackProps) {
	const reason = props.error.message || 'Something went wrong :(';

	return (
		<Alert
			color='red'
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				width: '100%',
				...props.sx,
			}}
			title={<Heading>Oops!</Heading>}
		>
			<Text color='red'>{reason}</Text>
		</Alert>
	);
}
