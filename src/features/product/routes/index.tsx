import { Container, Heading } from '~/components/ui';

export function ProductListPage() {
	return (
		<Container my={40} size={420}>
			<Heading align='center' mb={30} sx={{ fontWeight: 900 }}>
				Product
			</Heading>
		</Container>
	);
}
