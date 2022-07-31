import { AppLayout, Heading, HStack } from '~/components/ui';
import { Suspense } from '~/components/helpers';
import { ProductList } from '../components/card-list-product';
import { ButtonCreateProduct } from '../components/button-create-product';

export function ProductListPage() {
	return (
		<AppLayout>
			<HStack position='apart'>
				<Heading sx={{ fontWeight: 900 }}>Product</Heading>
				<ButtonCreateProduct />
			</HStack>

			<Suspense aria-label='Loading product' sx={{ minHeight: '10rem' }}>
				<ProductList />
			</Suspense>
		</AppLayout>
	);
}
