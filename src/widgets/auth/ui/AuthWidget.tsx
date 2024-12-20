import { authService } from '&shared/services/auth';
import { Button } from '&shared/ui/button';
import { Typography } from '&shared/ui/typography';
import { useRouter } from '@tanstack/react-router';
import { useUnit } from 'effector-react';
import { useLayoutEffect } from 'react';

export const AuthWidget = () => {
	const router = useRouter();
	const { loginWithApple, loginWithGoogle, isLoggedIn } = useUnit({
		loginWithApple: authService.inputs.loginwithApple,
		loginWithGoogle: authService.inputs.loginwithGoogle,
		isLoggedIn: authService.outputs.$isLoggedIn
	});

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
