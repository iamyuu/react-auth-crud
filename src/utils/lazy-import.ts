import { lazy } from 'react';

/**
 * Named imports for React.lazy
 *
 * @links {@see https://github.com/facebook/react/issues/14603#issuecomment-726551598 GitHub comment}
 *
 * @usage
 * ```tsx
 * const { Home } = lazyImport(() => import("./Home"), "Home");
 * ```
 */
export function lazyImport<T extends React.ComponentType, I extends { [K2 in K]: T }, K extends keyof I>(
	name: K,
	factory: () => Promise<I>,
): I {
	return Object.create({
		[name]: lazy(() => factory().then(module => ({ default: module[name] }))),
	});
}
