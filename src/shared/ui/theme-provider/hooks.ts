import { createContext, useContext } from 'react';
import { ThemeProviderState } from './types';

const initialState: ThemeProviderState = {
	theme: 'light',
	setTheme: () => null
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
