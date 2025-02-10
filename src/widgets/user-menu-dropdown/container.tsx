import { authService } from '&shared/services/auth';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '&shared/ui/dropdown-menu';
import { Icon } from '&shared/ui/icon';
import { cn } from '&shared/utils';
import { Link, useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import { useState } from 'react';

export function UserMenuDropdownWidget() {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { logout, user, isLoggedIn } = useUnit({
		logout: authService.inputs.logout,
		user: authService.outputs.$user,
		isLoggedIn: authService.outputs.$isLoggedIn
	});

	const onlogout = () => {
		logout();
		router.navigate({ to: '/' });
	};

	return (
		<div>
			{isLoggedIn && (
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger>
						<span className="bg-transparent p-0">
							<div className="flex items-center gap-2">
								{user && user.email}
								<Icon name={'chevron-down'} className={cn(isOpen && 'rotate-180', 'transition-transform')} />
							</div>
						</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-80 rounded-2xl bg-color-bg-100">
						<DropdownMenuLabel>
							<div className="flex w-full flex-col p-2">
								<span className="text-default text-color-gray-80">Подписка</span>
								<div className="flex flex-row items-center gap-2 text-default">
									<Icon name="subscriptionActive" />
									<span className="font-default text-default"> Активна до 20.09.25</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className="flex flex-row items-center gap-2">
									<Icon name="home" />
									<a href="/profile">Личный кабинет</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<div className="flex flex-row items-center gap-2">
										<Icon name="gear" />
										<span>Настройки</span>
									</div>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem>
											<div className="flex flex-row items-center gap-2">
												<Icon name="trash" />
												<span>Удалить аккаунт</span>
											</div>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className="flex flex-row items-center gap-2">
									<Icon name="bug" />
									<a target="_blank" href="https://t.me/Hyle_app_bot" className="text-default">
										Связаться с разработчиками
									</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex flex-row items-center gap-2">
										<Icon name="help" className="text-color-text-and-icon-80" />
										<span>Режим обучения</span>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex flex-row items-center gap-2">
										<Icon name="about" />
										<Link href="/about">О приложении</Link>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className="flex flex-row items-center gap-2">
									<Icon name="telegram" />
									<a href="https://t.me/hyle_app" target="_blank" className="text-default">
										Телеграмм канал
									</a>
								</div>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onlogout}>
							<div className="flex flex-row items-center gap-2">
								<Icon name="logout" />
								<span>Выйти из аккаунта</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
