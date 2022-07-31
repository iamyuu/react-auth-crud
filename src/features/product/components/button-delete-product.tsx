import { openConfirmModal } from '@mantine/modals';
import { Button, Text } from '~/components/ui';
import { IconTrash } from '~/assets/icons';
import { toast } from '~/libs/toast';
import { useDeleteProduct } from '../services/delete';
import type { Product } from '../types/Product';

export function ButtonDeleteProduct(props: Pick<Product, 'id' | 'name'>) {
	const { mutateAsync } = useDeleteProduct();

	async function handleDelete() {
		try {
			const { message } = await mutateAsync(props.id);

			toast.success(message);
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Something went wrong :(';

			toast.error(reason);
		}
	}

	function handleOpenConfirmation() {
		openConfirmModal({
			title: 'Delete product',
			centered: true,
			children: (
				<Text size='sm'>
					Are you sure you want to delete <Text component='strong'>{props.name}</Text>? You can&apos;t undo this action
					afterwards.
				</Text>
			),
			labels: { confirm: 'Yes, delete', cancel: 'Cancel' },
			confirmProps: { color: 'red' },
			onConfirm: handleDelete,
		});
	}

	return (
		<Button color='red' compact leftIcon={<IconTrash size={16} />} onClick={handleOpenConfirmation} variant='light'>
			Delete
		</Button>
	);
}
