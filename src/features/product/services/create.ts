import { useQueryClient, useMutation } from '@tanstack/react-query';
import { http } from '~/utils/http';
import type { ProductDTO } from '../schemas/product';

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (formData: ProductDTO) => http(`/product`, { data: formData }),

		onSuccess: async () => {
			await queryClient.invalidateQueries(['/product']);
		},
	});
}
