import { authService } from '&shared/services/auth';
import { Icon } from '&shared/ui/icon';
import { useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';

export function UserMenuDropdownWidget() {
	const router = useRouter();
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
				<span className="flex gap-2 items-center mx-2">
					<p>{user && user.email}</p>
					<Icon name="chevron-down" />
					<button onClick={onlogout}>exit</button>
				</span>
			)}
		</div>
	);
}
