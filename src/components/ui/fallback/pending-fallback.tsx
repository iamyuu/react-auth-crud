import { Box, Loader, type LoaderProps } from '~/components/ui';

export type PendingFallbackProps = Pick<LoaderProps, 'sx' | 'size' | 'aria-label'>;

export function PendingFallback(props: PendingFallbackProps) {
	return (
		<Box
			aria-label={props['aria-label'] ?? 'Loading'}
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
				width: '100%',
				...props.sx,
			}}
		>
			<Loader size={props.size} />
		</Box>
	);
}
