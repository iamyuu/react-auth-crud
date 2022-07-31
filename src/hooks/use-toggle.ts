import * as React from 'react';

export function useToggle(defaultValue = false) {
	return React.useReducer(prevState => !prevState, defaultValue);
}
