import { inputs } from '&shared/services/auth';
import { useAuth } from '&shared/services/auth/hooks';
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
	const logout = useUnit(inputs.logout);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const onlogout = () => {
		logout();
		router.navigate({ to: '/' });
	};

	const { user, isLoggedIn } = useAuth();

	return (
		<div>
			{isLoggedIn && (
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger>
						<span className="p-0 bg-transparent">
							<div className="flex items-center gap-2">
								{user && user.email}
								<Icon name={'chevron-down'} className={cn(isOpen && 'rotate-180', 'transition-transform')} />
							</div>
						</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-80 bg-color-bg-100 rounded-2xl">
						<DropdownMenuLabel>
							<div className="w-full p-2 flex flex-col">
								<span className="text-color-gray-80 text-default">Подписка</span>
								<div className="flex flex-row gap-2 items-center text-default">
									<Icon name="subscriptionActive" />
									<span className="text-default font-default"> Активна до 20.09.25</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className="flex items-center gap-2 flex-row">
									<Icon name="home" />
									<span>Личный кабинет</span>
								</div>
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<div className="flex items-center gap-2 flex-row">
										<Icon name="gear" />
										<span>Настройки</span>
									</div>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent>
										<DropdownMenuItem>
											<div className="flex items-center gap-2 flex-row">
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
								<div className="flex items-center gap-2 flex-row">
									<Icon name="bug" />
									<a target="_blank" href="https://t.me/Hyle_app_bot" className="text-default">
										Связаться с разработчиками
									</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex items-center gap-2 flex-row">
										<Icon name="help" className="text-color-text-and-icon-80" />
										<span>Режим обучения</span>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex items-center gap-2 flex-row">
										<Icon name="about" />
										<span>О приложении</span>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className="flex items-center gap-2 flex-row">
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
							<div className="flex items-center gap-2 flex-row">
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
