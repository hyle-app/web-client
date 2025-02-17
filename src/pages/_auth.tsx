import { CheerUpSidebar } from '&features/cheer-up';
import { DialogContainer } from '&shared/services/dialog';
import { Icon } from '&shared/ui/icon';
import { Logo } from '&shared/ui/logo';
import { MenuNavItem } from '&shared/ui/menu-nav-item/component';
import { cn } from '&shared/utils';
import { LeftSideCalendarWidget } from '&widgets/left-side-calendar';
import { SearchButtonWidget } from '&widgets/search';
import { UserMenuDropdownWidget } from '&widgets/user-menu-dropdown';
import { Outlet, createFileRoute, useMatchRoute, useRouter, useRouterState } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_auth')({
	component: AuthLayout
});

const LINKS = [
	{ label: 'Главная', to: '/home', icon: <Icon name="home" /> },
	{ label: 'Цели', to: '/goals', icon: <Icon name="goal" /> },
	{ label: 'Баланс', to: '/balance', icon: <Icon name="balance" /> },
	{ label: 'О приложении', to: '/about', icon: <Icon name="templates" /> }
];

function AuthLayout() {
	const router = useRouter();
	const matchRoute = useMatchRoute();
	const routerState = useRouterState();

	const [isExpanded, setIsExpanded] = React.useState(true);

	const title = React.useMemo(() => {
		return (
			{
				'/home': 'Главная',
				'/goals': 'Цели',
				'/balance': 'Баланс',
				'/about': 'О нас',
				'/profile': 'Личный кабинет'
			}[router.state.resolvedLocation.pathname] ?? ''
		);
	}, [routerState.resolvedLocation.pathname]);

	// TODO: Split this to widgets:
	// - Side menu widget
	// - Top bar widget
	return (
		<div
			className={cn('grid grid-cols-main-layout grid-rows-main-layout transition-all', {
				'grid-cols-main-layout-expanded': isExpanded,
				'grid-cols-main-layout-narrow': !isExpanded
			})}
		>
			<header className="col-start-2 col-end-3 row-start-1 row-end-1 flex justify-between px-6 py-6 items-center bg-color-bg-95">
				<h1 className="text-color-text-and-icon-80 text-heading-2 font-heading-2">{title}</h1>
				<span className="flex items-center ">
					<SearchButtonWidget />
					{/* TODO: Use notifications button widget here */}
					<span className="w-14 h-14 flex items-center justify-center">
						<Icon name="bell" className="w-6 h-6" />
					</span>
					{/* TODO: Use theme switcher button widget here */}
					<span className="w-14 h-14 flex items-center justify-center">
						<Icon name="moon" className="w-6 h-6" />
					</span>
					<UserMenuDropdownWidget />
				</span>
			</header>
			<aside className="col-start-1 col-end-2 row-start-1 row-end-3 py-6 h-screen bg-color-bg-100 @container">
				<nav className="flex flex-col justify-start h-full">
					<div className="flex items-center flex-wrap justify-start relative px-6">
						<div className="w-[var(--nav-sidebar-narrow-width)] h-[70px]">
							<Logo height="70px" width="70px" />
						</div>
						<button
							onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
							className="absolute right-0 translate-x-1/2 bg-color-white rounded-full w-8 h-8 flex items-center justify-center"
						>
							<Icon name="double-chevron-left" className={cn('transition-transform', { 'rotate-180': !isExpanded })} />
						</button>
					</div>
					<div className="mt-3 h-[276px] flex justify-center items-center mb-4 min-h-[312px]">
						<LeftSideCalendarWidget className={cn({ hidden: !isExpanded })} />
					</div>
					<hr />
					<ul className="grid grid-cols-1 gap-6 max-w-[185px] md:max-w-none mt-14 px-6 w-full">
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
			<main className="col-start-2 col-end-3 row-start-2 row-end-3 bg-color-bg-95 flex">
				<Outlet />
				<DialogContainer />

				<CheerUpSidebar />
			</main>
		</div>
	);
}
