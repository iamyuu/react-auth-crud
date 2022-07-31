import { Button } from '~/components/ui';
import { IconPlus } from '~/assets/icons';
import { useToggle } from '~/hooks';
import { useCreateProduct } from '../services/create';
import { DrawerProductForm } from './drawer-form-product';

export function ButtonCreateProduct() {
	const [isOpen, toggleOpen] = useToggle();
	const { mutateAsync } = useCreateProduct();

	return (
		<>
			<Button leftIcon={<IconPlus />} onClick={toggleOpen}>
				Create product
			</Button>

			<DrawerProductForm onClose={toggleOpen} onSubmit={mutateAsync} opened={isOpen} title='Create a new product' />
		</>
	);
}
