import { ActionIcon, type ActionIconProps, Tooltip } from '~/components/ui';

interface ButtonIconProps extends ActionIconProps {
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ButtonIcon({ label, ...restProps }: ButtonIconProps) {
	return (
		<Tooltip label={label} withArrow>
			<ActionIcon aria-label={label} {...restProps} />
		</Tooltip>
	);
}
