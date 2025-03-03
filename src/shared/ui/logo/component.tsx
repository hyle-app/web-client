import { useTheme } from '../theme-provider';
import LogoDarkComponent from './assets/logo-dark.svg';
import LogoComponent from './assets/logo.svg';
import { Props } from './types';

export function Logo(props: Props) {
	const { theme } = useTheme();
	if (theme === 'dark') {
		return <LogoDarkComponent {...props} />;
	}
	return <LogoComponent {...props} />;
}
