import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types/Product';

export function useProducts() {
	const { data, ...rqResult } = useQuery<Product[]>([`/product`]);

	return {
		...rqResult,
		data: data ?? [],
	};
}
