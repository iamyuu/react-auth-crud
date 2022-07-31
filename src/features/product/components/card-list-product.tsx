import { Box, Center, Card, Image, Text, Stack, HStack } from '~/components/ui';
import { useProducts } from '../services/list';
import type { Product } from '../types/Product';
import { ButtonEditProduct } from './button-edit-product';
import { ButtonDeleteProduct } from './button-delete-product';

function ProductListItem(props: Product) {
	return (
		<Card key={props.id} shadow='sm'>
			<Card.Section>
				<Image alt={props.name} height={200} src={props.image} withPlaceholder />
			</Card.Section>

			<Stack mt='sm' spacing='sm'>
				<Text weight={500}>{props.name}</Text>

				<Text color='dimmed' lineClamp={3} size='sm' sx={{ minHeight: 65 }}>
					{props.description}
				</Text>

				<HStack position='right' spacing='xs'>
					<ButtonDeleteProduct id={props.id} name={props.name} />
					<ButtonEditProduct {...props} />
				</HStack>
			</Stack>
		</Card>
	);
}

function ProductEmptyState() {
	return (
		<Center aria-label='product is empty'>
			<Text component='em'>The product currently is empty. Please create a new product.</Text>
		</Center>
	);
}

export function ProductList() {
	const { data } = useProducts();

	if (data.length < 1) {
		return <ProductEmptyState />;
	}

	return (
		<Box
			sx={theme => ({
				display: 'grid',
				gap: theme.spacing.lg,
				gridTemplateColumns: `repeat(auto-fill, minmax(${theme.spacing.md}rem, 1fr))`,
			})}
		>
			{data.map(product => (
				<ProductListItem key={product.id} {...product} />
			))}
		</Box>
	);
}
