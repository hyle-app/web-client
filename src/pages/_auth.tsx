import { CheerUpSidebar } from '&features/cheer-up';
import { DialogContainer } from '&shared/services/dialog';
import { ThemeToogle } from '&shared/ui/theme-toogle';
import { cn } from '&shared/utils';
import { SearchButtonWidget } from '&widgets/search';
import { inputs, outputs, SideMenu } from '&widgets/side-menu';
import { UserMenuDropdownWidget } from '&widgets/user-menu-dropdown';
import { createFileRoute, Outlet, useRouter, useRouterState } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import { Bell } from 'lucide-react';
import React from 'react';

export const Route = createFileRoute('/_auth')({
	component: AuthLayout
});

function AuthLayout() {
	const router = useRouter();
	const { isSideMenuOpen } = useUnit({
		isSideMenuOpen: outputs.$isSideMenuOpen,
		setSideMenuOpen: inputs.setSideMenuOpen
	});
	const routerState = useRouterState();

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
	// - Top bar widget
	return (
		<div
			className={cn('grid grid-cols-main-layout grid-rows-main-layout transition-all', {
				'grid-cols-main-layout-expanded': isSideMenuOpen,
				'grid-cols-main-layout-narrow': !isSideMenuOpen
			})}
		>
			<header className="col-start-2 col-end-3 row-start-1 row-end-1 flex items-center justify-between bg-color-bg-95 px-6 py-6">
				<h1 className="text-heading-2 font-heading-2 text-color-text-and-icon-80">{title}</h1>
				<span className="flex items-center">
					<SearchButtonWidget />
					<span className="flex h-14 w-14 items-center justify-center">
						<ThemeToogle />
					</span>
					{/* TODO: Use notifications button widget here */}
					<span className="flex h-14 w-14 items-center justify-center">
						<Bell size={24} className="text-color-text-and-icon-80" />
					</span>
					<UserMenuDropdownWidget />
				</span>
			</header>
			<SideMenu />
			<main className="col-start-2 col-end-3 row-start-2 row-end-3 flex bg-color-bg-95">
				<Outlet />
				<DialogContainer />

				<CheerUpSidebar />
			</main>
		</div>
	);
}
