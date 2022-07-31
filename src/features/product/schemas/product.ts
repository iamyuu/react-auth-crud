import * as z from 'zod';

export const productSchema = z.object({
	name: z.string().min(3),
	description: z.string().min(5),
	price: z.number().min(1),
	sell_price: z.number().min(1),
	image: z.string(),
});

export type ProductDTO = z.infer<typeof productSchema>;
