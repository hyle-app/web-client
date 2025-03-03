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
			<header className="col-start-2 col-end-3 row-start-1 row-end-1 flex items-center justify-between bg-color-bg-95 px-8 py-6">
				<div className="flex items-center gap-4">
					{!isExpanded && (
						<button
							onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
							className="flex h-8 w-8 items-center justify-center"
						>
							<Icon
								name="sidebar"
								className={cn('h-6 w-6 text-color-gray-50 transition-transform', { 'rotate-180': !isExpanded })}
							/>
						</button>
					)}
					<h1 className="text-heading-2 font-heading-2 text-color-text-and-icon-80">{title}</h1>
				</div>
				<span className="flex items-center">
					<SearchButtonWidget />
					{/* TODO: Use notifications button widget here */}
					<span className="flex h-14 w-14 items-center justify-center">
						<Icon name="bell" className="h-6 w-6" />
					</span>
					{/* TODO: Use theme switcher button widget here */}
					<span className="flex h-14 w-14 items-center justify-center">
						<Icon name="moon" className="h-6 w-6" />
					</span>
					<UserMenuDropdownWidget />
				</span>
			</header>
			<aside className="col-start-1 col-end-2 row-start-1 row-end-3 h-screen bg-color-bg-100 py-6 @container">
				<nav className="flex h-full flex-col justify-start">
					<div className="relative flex flex-wrap items-center justify-between px-6">
						<div className="h-[70px] w-[var(--nav-sidebar-narrow-width)]">
							<Logo height="70px" width="70px" />
						</div>
						{isExpanded && (
							<button
								onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
								className="flex h-8 w-8 translate-x-2 items-center justify-center rounded-full bg-color-white"
							>
								<Icon
									name="sidebar"
									className={cn('h-6 w-6 text-color-gray-50 transition-transform', { 'rotate-180': !isExpanded })}
								/>
							</button>
						)}
					</div>
					<div className="mb-4 mt-3 flex h-[276px] min-h-[312px] items-center justify-center">
						<LeftSideCalendarWidget className={cn({ hidden: !isExpanded })} />
					</div>
					<hr
						className={cn('-translate-x-full border-t-color-gray-10 transition-transform', {
							'translate-x-0': isExpanded
						})}
					/>
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
			<main className="col-start-2 col-end-3 row-start-2 row-end-3 flex bg-color-bg-95">
				<Outlet />
				<DialogContainer />

				<CheerUpSidebar />
			</main>
		</div>
	);
}
