import { Icon } from '&shared/ui/icon';
import { Logo } from '&shared/ui/logo';
import { MenuNavItem } from '&shared/ui/menu-nav-item/component';
import { cn } from '&shared/utils';
import { LeftSideCalendarWidget } from '&widgets/left-side-calendar';
import { useMatchRoute, useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import { PanelLeft } from 'lucide-react';
import { inputs, outputs } from '../model';

const LINKS = [
	{ label: 'Главная', to: '/home', icon: <Icon name="home" /> },
	{ label: 'Цели', to: '/goals', icon: <Icon name="goal" /> },
	{ label: 'Баланс', to: '/balance', icon: <Icon name="balance" /> },
	{ label: 'О приложении', to: '/about', icon: <Icon name="templates" /> }
];

export const SideMenu = () => {
	const router = useRouter();
	const matchRoute = useMatchRoute();
	const { isSideMenuOpen, setSideMenuOpen } = useUnit({
		isSideMenuOpen: outputs.$isSideMenuOpen,
		setSideMenuOpen: inputs.setSideMenuOpen
	});
	return (
		<aside className="col-start-1 col-end-2 row-start-1 row-end-3 h-screen bg-color-bg-100 py-6 @container">
			<nav className="flex h-full flex-col justify-start">
				<div className="relative flex flex-wrap items-center justify-between px-6">
					<div className="h-[70px] w-[var(--nav-sidebar-narrow-width)]">
						<Logo height="70px" width="70px" />
					</div>
					{isSideMenuOpen && (
						<button
							onClick={() => setSideMenuOpen(!isSideMenuOpen)}
							className="flex h-8 w-8 translate-x-2 items-center justify-center rounded-full bg-color-bg-100"
						>
							<PanelLeft
								size={24}
								className={cn('text-color-gray-50 transition-transform', { 'rotate-180': !isSideMenuOpen })}
							/>
						</button>
					)}
				</div>
				<div className="mb-4 mt-3 flex h-[276px] min-h-[312px] items-center justify-center">
					<LeftSideCalendarWidget className={cn({ hidden: !isSideMenuOpen })} />
				</div>
				<div className={cn('h-[1px] bg-color-gray-10', { hidden: !isSideMenuOpen })} />
				<ul className="mt-14 grid w-full max-w-[185px] grid-cols-1 gap-6 px-6 md:max-w-none">
					{LINKS.map((link) => (
						<li key={link.to} className="col-span-1 flex justify-start">
							<MenuNavItem
								title={link.label}
								iconSlot={link.icon}
								onClick={() => router.navigate({ to: link.to })}
								isActive={Boolean(matchRoute({ to: link.to }))}
							/>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};
