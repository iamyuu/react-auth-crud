import { useAuthContext } from '~/features/auth';
import { lazyImport } from '~/utils/lazy-import';

const { LoginPage } = lazyImport('LoginPage', () => import('~/features/auth'));
const { ProductListPage } = lazyImport('ProductListPage', () => import('~/features/product'));

export function App() {
	const { isAuth } = useAuthContext();
	return isAuth ? <ProductListPage /> : <LoginPage />;
}
