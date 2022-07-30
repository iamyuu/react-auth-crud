import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '~/assets/icons';

export const toast = {
	success: (message: string) =>
		showNotification({
			message,
			color: 'green',
			icon: <IconCheck />,
		}),

	error: (message: string) =>
		showNotification({
			message,
			color: 'red',
			icon: <IconX />,
		}),
};
