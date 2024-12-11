import { inputs } from '&shared/services/auth';
import { useAuth } from '&shared/services/auth/hooks';
import { Button } from '&shared/ui/button';
import { Typography } from '&shared/ui/typography';
import { useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import { useLayoutEffect } from 'react';

export const AuthWidget = () => {
	const router = useRouter();

	const loginWithGoogle = useUnit(inputs.loginwithGoogle);
	const loginWithApple = useUnit(inputs.loginwithApple);
	const { isLoggedIn } = useAuth();
	useLayoutEffect(() => {
		if (isLoggedIn) {
			router.navigate({ to: '/home' });
		}
	}, [isLoggedIn]);
	return (
		<div className="h-full w-full flex justify-center items-center flex-col gap-10 z-10 absolute top-0.5 left-0.5">
			<div className="flex flex-col w-full text-center">
				<Typography variant="heading-4">Вход</Typography>
				<Typography className="text-color-gray-80">
					Если вы пользуетесь мобильным приложением, зайти нужно с той же почты.
				</Typography>
			</div>
			<div className="flex flex-col gap-4 items-center justify-center">
				<Button onClick={loginWithGoogle} className="w-max" appearance="primary" variant="button">
					Войти с помощью Google
				</Button>
				<Button onClick={loginWithApple} className="w-max" appearance="primary" variant="button">
					Войти с помощью Apple
				</Button>
			</div>
		</div>
	);
};
