import { Global } from '@mantine/core';

export function GlobalStyles() {
	return (
		<Global
			styles={theme => ({
				'*, *::before, *::after': {
					boxSizing: 'border-box',
				},

				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				body: {
					...theme.fn.fontStyles(),
					color: theme.colors.gray[9],
					backgroundColor: theme.colors.gray[1],
					lineHeight: theme.lineHeight,
				},
			})}
		/>
	);
}
