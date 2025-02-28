import { HttpModeToggle } from '&features/toggle-http-mode';
import { authService } from '&shared/services/auth';
import { Button } from '&shared/ui/button';
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
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { Link, useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import { Bug, Check, ChevronDown, HelpCircle, Home, Info, LogOut, Send, Settings, Trash } from 'lucide-react';
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
						<Button appearance="ghost" className="flex items-center gap-2 bg-transparent p-0">
							<Typography className="font-semibold">{user && user.email}</Typography>
							<ChevronDown
								size={24}
								className={cn({ 'rotate-180': isOpen }, 'text-color-text-and-icon-80 transition-transform')}
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-80 rounded-2xl border-none bg-color-bg-100">
						<DropdownMenuLabel>
							<div className="flex w-full flex-col p-2">
								<span className="text-color-gray-80">Подписка</span>
								<div className="flex flex-row items-center gap-2 text-default">
									<Check size={16} className="text-color-success" />
									<Typography variant="paragraph"> Активна до 20.09.25</Typography>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className="flex flex-row items-center gap-2">
									<Home size={16} className="text-color-text-and-icon-80" />
									<a className="text-color-text-and-icon-80" href="/profile">
										Личный кабинет
									</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<div className="flex flex-row items-center gap-2">
										<Settings size={16} className="text-color-text-and-icon-80" />
										<span className="text-color-text-and-icon-80">Настройки</span>
									</div>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent sideOffset={5} className="border-none">
										<DropdownMenuItem>
											<div className="flex flex-row items-center gap-2">
												<Trash size={16} className="text-color-text-and-icon-80" />
												<span className="text-color-text-and-icon-80">Удалить аккаунт</span>
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
									<Bug size={16} className="text-color-text-and-icon-80" />
									<a target="_blank" href="https://t.me/Hyle_app_bot" className="text-color-text-and-icon-80">
										Связаться с разработчиками
									</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex flex-row items-center gap-2">
										<HelpCircle size={16} className="text-color-text-and-icon-80" />
										<span className="text-color-text-and-icon-80">Режим обучения</span>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex flex-row items-center gap-2">
										<Info size={16} className="text-color-text-and-icon-80" />
										<Link className="text-color-text-and-icon-80" href="/about">
											О приложении
										</Link>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<div className="flex flex-row items-center gap-2">
									<Send size={16} className="text-color-text-and-icon-80" />
									<a href="https://t.me/hyle_app" target="_blank" className="text-color-text-and-icon-80">
										Телеграмм канал
									</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<HttpModeToggle />
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onlogout}>
							<div className="flex flex-row items-center gap-2">
								{/* <Icon name="logout" className="text-color-text-and-icon-80" /> */}
								<LogOut size={16} className="text-color-text-and-icon-80" />
								<span className="text-color-text-and-icon-80">Выйти из аккаунта</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
