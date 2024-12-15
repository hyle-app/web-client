import { AuthNavBar } from './ui/AuthNavBar';
import { AuthWidget } from './ui/AuthWidget';
import { Background } from './ui/Background';

export function AuthWidgetContainer() {
	return (
		<main className="w-full min-h-screen flex flex-col items-center justify-start relative">
			<AuthNavBar />
			<Background />
			<AuthWidget />
		</main>
	);
}
