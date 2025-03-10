import { Button } from '&shared/ui/button';
import { useTheme } from '&shared/ui/theme-provider';
import { Moon, Sun } from 'lucide-react';

export const ThemeToogle = () => {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			appearance="ghost"
			className="bg-transparent"
			variant="icon"
			iconSlot={theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		></Button>
	);
};
