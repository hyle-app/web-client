import { inputs as deleteAccountInputs } from '&features/delete-account/model';
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
	const { logout, user, isLoggedIn, deleteAccount } = useUnit({
		logout: authService.inputs.logout,
		user: authService.outputs.$user,
		isLoggedIn: authService.outputs.$isLoggedIn,
		deleteAccount: deleteAccountInputs.deleteAccount
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
								className={cn(
									{ 'rotate-180': isOpen },
									'text-color-text-and-icon-80 transition-transform hover:text-color-white'
								)}
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-80 rounded-2xl border-none bg-color-bg-100 p-0 [&_[data-radix-collection-item]:hover]:bg-color-brand-primary-70 [&_[data-radix-collection-item]:hover]:text-color-white [&_[data-radix-collection-item]]:px-4 [&_[data-radix-collection-item]]:py-3 [&_[data-radix-collection-item]]:text-color-text-and-icon-80">
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
									<Home size={16} />
									<a href="/profile">Личный кабинет</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<div className="flex flex-row items-center gap-2">
										<Settings size={16} />
										<span>Настройки</span>
									</div>
								</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent sideOffset={5} className="border-none">
										<DropdownMenuItem>
											<button className="flex flex-row items-center gap-2" onClick={() => deleteAccount()}>
												<Trash size={16} />
												<span>Удалить аккаунт</span>
											</button>
										</DropdownMenuItem>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<div className="flex flex-row items-center gap-2">
									<Bug size={16} />
									<a target="_blank" href="https://t.me/Hyle_app_bot">
										Связаться с разработчиками
									</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex flex-row items-center gap-2">
										<HelpCircle size={16} />
										<span>Режим обучения</span>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link to="" className="text-default">
									<div className="flex flex-row items-center gap-2">
										<Info size={16} />
										<Link href="/about">О приложении</Link>
									</div>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="group">
								<div className="flex flex-row items-center gap-2">
									<Send size={16} />
									<a href="https://t.me/hyle_app" target="_blank">
										Телеграмм канал
									</a>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<HttpModeToggle textClassName="text-color-text-and-icon-80 hover:text-color-white transition-colors" />
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onlogout}>
							<div className="flex flex-row items-center gap-2">
								<LogOut size={16} />
								<span>Выйти из аккаунта</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
}
