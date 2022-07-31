import { useQueryClient, useMutation } from '@tanstack/react-query';
import { http } from '~/utils/http';

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (productId: string) => http<{ message: string }>(`/product/${productId}`, { method: 'DELETE' }),

		onSuccess: async () => {
			await queryClient.invalidateQueries(['/product']);
		},
	});
}
