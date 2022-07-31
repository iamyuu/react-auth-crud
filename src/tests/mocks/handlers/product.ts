import { rest } from 'msw';
import { faker } from '@faker-js/faker';
import { API_URL } from '~/constants/env';
import { db } from '../db';
import { requireAuth } from '../utils';

interface ProductBody {
	name: string;
	description: string;
	price: number;
	sell_price: number;
	image: string;
}

const namespace = `${API_URL}/product`;

export const productHandlers = [
	rest.get(namespace, (req, res, ctx) => {
		try {
			requireAuth(req);

			const result = db.product.getAll();

			return res(ctx.json(result));
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Internal Server Error';
			const code = /unauth/i.test(reason) ? 401 : 500;

			return res(ctx.status(code), ctx.json({ message: reason }));
		}
	}),

	rest.post(namespace, async (req, res, ctx) => {
		try {
			requireAuth(req);

			const formData = await req.json<ProductBody>();
			const result = db.product.create({
				id: faker.datatype.uuid(),
				createdAt: Date.now(),
				...formData,
			});

			return await res(ctx.json({ message: `Success create ${result.name}` }));
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Internal Server Error';
			const code = /unauth/i.test(reason) ? 401 : 500;

			return res(ctx.status(code), ctx.json({ message: reason }));
		}
	}),

	rest.get(`${namespace}/:productId`, (req, res, ctx) => {
		try {
			requireAuth(req);

			const productId = req.params.productId.toString();
			const result = db.product.findFirst({
				where: {
					id: {
						equals: productId,
					},
				},
			});

			return res(ctx.json(result));
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Internal Server Error';
			const code = /unauth/i.test(reason) ? 401 : 500;

			return res(ctx.status(code), ctx.json({ message: reason }));
		}
	}),

	rest.patch(`${namespace}/:productId`, async (req, res, ctx) => {
		try {
			requireAuth(req);

			const productId = req.params.productId.toString();
			const formData = await req.json<ProductBody>();
			const result = db.product.update({
				where: {
					id: {
						equals: productId,
					},
				},
				data: formData,
			});

			return await res(ctx.json({ message: `Success edit ${result?.name}` }));
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Internal Server Error';
			const code = /unauth/i.test(reason) ? 401 : 500;

			return res(ctx.status(code), ctx.json({ message: reason }));
		}
	}),

	rest.delete(`${namespace}/:productId`, (req, res, ctx) => {
		try {
			requireAuth(req);

			const productId = req.params.productId.toString();
			const result = db.product.delete({
				where: {
					id: {
						equals: productId,
					},
				},
			});

			return res(ctx.json({ message: `Success delete ${result?.name}` }));
		} catch (error: unknown) {
			const reason = error instanceof Error ? error.message : 'Internal Server Error';
			const code = /unauth/i.test(reason) ? 401 : 500;

			return res(ctx.status(code), ctx.json({ message: reason }));
		}
	}),
];
