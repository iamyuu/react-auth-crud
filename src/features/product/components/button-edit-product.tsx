import { Button } from '~/components/ui';
import { IconPencil } from '~/assets/icons';
import { useToggle } from '~/hooks';
import { useUpdateProduct } from '../services/update';
import type { Product } from '../types/Product';
import { DrawerProductForm } from './drawer-form-product';

export function ButtonEditProduct(props: Product) {
	const [isOpen, toggleOpen] = useToggle();
	const { mutateAsync } = useUpdateProduct();

	return (
		<>
			<Button color='blue' compact leftIcon={<IconPencil size={16} />} onClick={toggleOpen} variant='light'>
				Edit
			</Button>

			<DrawerProductForm
				defaultValues={props}
				onClose={toggleOpen}
				onSubmit={formData => mutateAsync({ productId: props.id, ...formData })}
				opened={isOpen}
				title='Edit product'
			/>
		</>
	);
}
