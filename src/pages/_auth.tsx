import { Icon } from '&shared/ui/icon';
import { Logo } from '&shared/ui/logo';
import { MenuNavItem } from '&shared/ui/menu-nav-item/component';
import { cn } from '&shared/utils';
import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import React from 'react';

export const Route = createFileRoute('/_auth')({
	component: AuthLayout
});

const LINKS = [
	{ label: 'Home', to: '/home', icon: <Icon name="home" /> },
	{ label: 'Goals', to: '/goals', icon: <Icon name="goal" /> },
	{ label: 'Balance', to: '/balance', icon: <Icon name="balance" /> },
	{ label: 'About', to: '/about', icon: <Icon name="templates" /> }
];

function AuthLayout() {
	const router = useRouter();

	const [isExpanded, setIsExpanded] = React.useState(true);

	const title = React.useMemo(() => {
		return (
			{
				'/home': 'Главная',
				'/goals': 'Цели',
				'/balance': 'Баланс',
				'/about': 'О нас'
			}[router.state.resolvedLocation.pathname] ?? ''
		);
	}, [router.state.resolvedLocation.pathname]);

	return (
		<div
			className={cn('grid grid-cols-main-layout grid-rows-main-layout transition-all', {
				'grid-cols-main-layout-expanded': isExpanded,
				'grid-cols-main-layout-narrow': !isExpanded
			})}
		>
			<header className="col-start-2 col-end-3 row-start-1 row-end-1 flex justify-between px-8 py-6 items-center bg-color-bg-95">
				<h1 className="text-color-text-andicon-80 text-heading-2 font-heading-2">{title}</h1>
				<span className="flex items-center ">
					{/* TODO: Use notifications button widget here */}
					<span className="w-14 h-14 flex items-center justify-center">
						<Icon name="bell" />
					</span>
					{/* TODO: Use theme switcher button widget here */}
					<span className="w-14 h-14 flex items-center justify-center">
						<Icon name="moon" />
					</span>
					{/* TODO: Use search button widget here */}
					<span className="w-14 h-14 flex items-center justify-center">
						<Icon name="search" />
					</span>
					{/* TODO: Use auth display widget here */}
					<span className="flex">
						<p>usermail@gmail.com</p>
						<Icon name="chevron-down" />
					</span>
				</span>
			</header>
			<aside className="col-start-1 col-end-2 row-start-1 row-end-3 p-6 h-screen bg-color-bg-100 @container">
				<nav className="flex flex-col justify-start h-full">
					<div className="flex @[185px]:justify-between items-center flex-wrap justify-center">
						<div className="w-[var(--nav-sidebar-narrow-width)] h-[70px]">
							<Logo height="70px" width="70px" />
						</div>
						<Icon name="double-chevron-left" onClick={() => setIsExpanded((isExpanded) => !isExpanded)} />
					</div>
					{/* TODO: Use inline-calendar widget here */}
					<div className="mt-3 h-[276px] flex justify-center items-center">Calendar</div>
					<hr />
					<ul className="grid grid-cols-1 gap-6 max-w-[185px] mt-14">
						{LINKS.map((link) => (
							<li className="col-span-1 flex @[185px]:justify-start justify-center">
								<MenuNavItem
									title={link.label}
									iconSlot={link.icon}
									onClick={() => router.navigate({ to: link.to })}
									isActive={router.matchRoute({ to: link.to })}
								/>
							</li>
						))}
					</ul>
				</nav>
			</aside>
			<main className="col-start-2 col-end-3 row-start-2 row-end-3 px-8 bg-color-bg-95">
				<Outlet />
			</main>
		</div>
	);
}
