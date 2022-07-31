import {
	Drawer,
	ScrollArea,
	Text,
	Button,
	Paper,
	FileButton,
	TextInput,
	Textarea,
	type DrawerProps,
} from '~/components/ui';
import { toast } from '~/libs/toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, type ProductDTO } from '../schemas/product';
import { fileTobase64 } from '../utils/file-to-base64';
import { PriceInput } from './price-input';
import { ImagePreview } from './image-preview';

const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'].join(',');

interface DrawerProductFormProps extends Pick<DrawerProps, 'opened' | 'onClose'> {
	title: string;
	defaultValues?: Partial<ProductDTO>;
	onSubmit: (formData: ProductDTO) => void;
}

function ProductForm(props: Pick<DrawerProductFormProps, 'defaultValues' | 'onSubmit'>) {
	const { register, control, setValue, formState, handleSubmit } = useForm<ProductDTO>({
		defaultValues: props.defaultValues,
		resolver: zodResolver(productSchema),
		reValidateMode: 'onChange',
	});

	const fieldPrice = register('price', { valueAsNumber: true });
	const fieldSellPrice = register('sell_price', { valueAsNumber: true });

	async function handleChangeImage(newImage: File | null) {
		try {
			const base64Image = await fileTobase64(newImage);

			if (!base64Image) {
				throw new Error('Try using another image');
			}

			setValue('image', base64Image);
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Try using another image';

			toast.error(reason);
		}
	}

	const onSubmit = handleSubmit(
		async formData => {
			try {
				props.onSubmit(formData);
			} catch (error: unknown) {
				const reason = error instanceof Error ? error.message : 'Something went wrong :(';

				toast.error(reason);
			}
		},
		// formError => {
		// 	Object.values(formError).forEach(({ message }) => {
		// 		if (typeof message === 'string') {
		// 			toast.error(message);
		// 		}
		// 	});
		// },
	);

	return (
		<Paper
			component='form'
			id='drawer-form-product'
			onSubmit={onSubmit}
			sx={theme => ({
				'& > * + *': {
					marginTop: theme.spacing.md,
				},
			})}
		>
			<TextInput {...register('name')} error={formState.errors.name?.message} label='Name' placeholder='Product name' />

			<PriceInput
				error={formState.errors.price?.message}
				name={fieldPrice.name}
				onBlur={fieldPrice.onBlur}
				onChange={newValue => setValue('price', newValue ?? 0)}
				placeholder='Product price'
				ref={fieldPrice.ref}
			/>

			<PriceInput
				error={formState.errors.sell_price?.message}
				label='Sell price'
				name={fieldSellPrice.name}
				onBlur={fieldSellPrice.onBlur}
				onChange={newValue => setValue('sell_price', newValue ?? 0)}
				placeholder='Product sell price'
				ref={fieldSellPrice.ref}
			/>

			<Textarea
				{...register('description')}
				autosize
				error={formState.errors.description?.message}
				label='Description'
				maxRows={5}
				minRows={3}
				placeholder='Product description'
			/>

			<FileButton accept={IMAGE_MIME_TYPE} name='image' onChange={handleChangeImage}>
				{fileButtonProps => (
					<Button {...fileButtonProps} fullWidth variant='outline'>
						Choose image
					</Button>
				)}
			</FileButton>

			<ImagePreview control={control} error={formState.errors.image?.message} />

			<Button fullWidth loading={formState.isSubmitting} type='submit'>
				{formState.isSubmitting ? 'Submitting' : 'Submit'}
			</Button>
		</Paper>
	);
}

export function DrawerProductForm(props: DrawerProductFormProps) {
	return (
		<Drawer
			aria-describedby='drawer-form-product'
			aria-labelledby='drawer-product'
			closeButtonLabel='Close form product'
			onClose={props.onClose}
			opened={props.opened}
			padding='xl'
			position='right'
			size='xl'
			title={
				<Text id='drawer-product' weight={600}>
					{props.title}
				</Text>
			}
		>
			<ScrollArea style={{ height: 645 }} type='scroll'>
				<ProductForm
					defaultValues={props.defaultValues}
					onSubmit={formData => {
						props.onSubmit(formData);
						props.onClose();
					}}
				/>
			</ScrollArea>
		</Drawer>
	);
}
