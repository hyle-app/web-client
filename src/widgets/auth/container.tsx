import { AuthNavBar } from './ui/AuthNavBar';
import { AuthWidget } from './ui/AuthWidget';
import { Background } from './ui/Background';

export function AuthWidgetContainer() {
	return (
		<main className="relative flex grow flex-col">
			<div className="relative flex grow flex-col items-center justify-start">
				<AuthNavBar />
				<Background />
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-b from-[#ffffff00] from-0% to-white to-100%"></div>
			</div>
			<AuthWidget />
		</main>
	);
}
