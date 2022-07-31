import { useQueryClient, useMutation } from '@tanstack/react-query';
import { http } from '~/utils/http';
import type { ProductDTO } from '../schemas/product';

interface EditProductDTO extends ProductDTO {
	productId: string;
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ productId, ...formData }: EditProductDTO) =>
			http(`/product/${productId}`, {
				method: 'PATCH',
				data: { ...formData },
			}),

		onSuccess: async () => {
			await queryClient.invalidateQueries(['/product']);
		},
	});
}
