import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '~/providers/app';
import { App } from './app';

import './tests/mocks/dev-server';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
	<StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</StrictMode>,
);
