import { Button } from '&shared/ui/button';
import { Icon } from '&shared/ui/icon';
import { useTheme } from '&shared/ui/theme-provider';

export const ThemeToogle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			appearance="ghost"
			className="bg-transparent"
			variant="icon"
			iconSlot={theme === 'light' ? <Icon name="moon" /> : <Icon name="flag" />}
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		></Button>
	);
};
