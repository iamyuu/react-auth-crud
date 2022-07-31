import { Image, Stack, Text } from '~/components/ui';
import { useWatch, type UseWatchProps } from 'react-hook-form';
import type { ProductDTO } from '../schemas/product';

interface ImagePreviewProps extends Pick<UseWatchProps<ProductDTO>, 'control'> {
	error?: string;
}

export function ImagePreview(props: ImagePreviewProps) {
	const image = useWatch({ name: 'image', control: props.control });

	return (
		<Stack spacing={5}>
			<Image
				height={200}
				src={image}
				sx={theme => {
					if (props.error) {
						return {
							border: '1px solid',
							borderColor: theme.colors.red[4],
						};
					}

					return {};
				}}
				withPlaceholder
			/>

			{props.error ? (
				<Text color='red' component='small' size={12}>
					{props.error}
				</Text>
			) : null}
		</Stack>
	);
}
