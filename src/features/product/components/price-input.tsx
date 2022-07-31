import * as React from 'react';
import { NumberInput, type NumberInputProps } from '~/components/ui';

export const PriceInput = React.forwardRef<HTMLInputElement, NumberInputProps>(function PriceInput(props, ref) {
	return (
		<NumberInput
			hideControls
			// formatter={value => {
			// 	if (typeof value === 'string') {
			// 		return Number.isNaN(parseFloat(value)) ? 'Rp ' : `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
			// 	}

			// 	return '$ ';
			// }}
			label='Price'
			noClampOnBlur
			ref={ref}
			// parser={value => {
			// 	if (typeof value === 'string') {
			// 		return value.replace(/Rp\s?|(,*)/g, '');
			// 	}
			// }}
			{...props}
		/>
	);
});
