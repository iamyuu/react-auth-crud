import type { ENTITY_TYPE, PRIMARY_KEY } from '@mswjs/data/lib/glossary';
import { factory, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';
// import { productBuilder, imageBuilder } from './generate';
import { hash } from './utils';

export const db = factory({
	user: {
		id: primaryKey(Number),
		name: String,
		email: String,
		password: String,
		createdAt: Number,
	},
	product: {
		id: primaryKey(faker.datatype.uuid),
		name: String,
		description: String,
		price: Number,
		sell_price: Number,
		image: String,
		createdAt: Number,
	},
});

// https://github.com/mswjs/data/issues/185#issuecomment-1059022389
export type Model<Key extends keyof typeof db> = Omit<
	ReturnType<typeof db[Key]['create']>,
	typeof ENTITY_TYPE | typeof PRIMARY_KEY
>;

function initDb() {
	db.user.create({
		id: 1,
		name: 'Yusuf',
		email: 'yusuf@iamyuu.dev',
		password: hash('secret'),
	});

	// [...Array(3).keys()].forEach(() => {
	// 	const product = productBuilder({
	// 		map: data => {
	// 			data.image = imageBuilder({ text: data.name.replaceAll(' ', '+') });
	// 			return data;
	// 		},
	// 	});

	// 	db.product.create(product);
	// });
}

initDb();
