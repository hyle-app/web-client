import { Icon } from '&shared/ui/icon';
import { Logo } from '&shared/ui/logo';
import { MenuNavItem } from '&shared/ui/menu-nav-item/component';
import { cn } from '&shared/utils';
import { LeftSideCalendarWidget } from '&widgets/left-side-calendar';
import { useMatchRoute, useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
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
				<div className="relative flex flex-wrap items-center justify-start px-6">
					<div className="h-[70px] w-[var(--nav-sidebar-narrow-width)]">
						<Logo height="70px" width="70px" />
					</div>
					<button
						onClick={() => setSideMenuOpen(!isSideMenuOpen)}
						className="absolute right-0 flex h-8 w-8 translate-x-1/2 items-center justify-center rounded-full bg-color-white"
					>
						<Icon
							name="double-chevron-left"
							className={cn('transition-transform', { 'rotate-180': !isSideMenuOpen })}
						/>
					</button>
				</div>
				<div className="mb-4 mt-3 flex h-[276px] min-h-[312px] items-center justify-center">
					<LeftSideCalendarWidget className={cn({ hidden: !isSideMenuOpen })} />
				</div>
				<hr className={cn({ hidden: !isSideMenuOpen })} />
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
