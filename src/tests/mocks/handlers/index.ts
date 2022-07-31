import { authHandlers } from './auth';
import { productHandlers } from './product';

export const handlers = [...authHandlers, ...productHandlers];
