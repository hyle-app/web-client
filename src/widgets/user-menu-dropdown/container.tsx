import { inputs } from '&shared/services/auth';
import { useAuth } from '&shared/services/auth/hooks';
import { Icon } from '&shared/ui/icon';
import { useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
export function UserMenuDropdownWidget() {
	const router = useRouter();
	const logout = useUnit(inputs.logout);

	const onlogout = () => {
		logout();
		router.navigate({ to: '/' });
	};

	const { user, isLoggedIn } = useAuth();

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
