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
		<div className="absolute left-0.5 top-0.5 z-10 flex h-full w-full flex-col items-center justify-center gap-10">
			<div className="flex w-full flex-col text-center">
				<Typography variant="heading-4">Вход</Typography>
				<Typography className="text-color-gray-80">
					Если вы пользуетесь мобильным приложением, зайти нужно с той же почты.
				</Typography>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<Button onClick={loginWithGoogle} className="flex w-full gap-4 px-12" appearance="primary" variant="button">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M4.37617 8.068C4.16342 8.68988 4.05528 9.34274 4.05617 10C4.05617 10.734 4.18817 11.437 4.43217 12.086C4.73627 12.8972 5.21396 13.6321 5.8318 14.2393C6.44964 14.8466 7.19271 15.3115 8.00902 15.6015C8.82532 15.8916 9.69515 15.9998 10.5576 15.9185C11.4201 15.8372 12.2544 15.5684 13.0022 15.131H13.0032C14.1812 14.4404 15.0863 13.3661 15.5672 12.088H10.2202V8.132H19.8252C20.0736 9.44049 20.0586 10.7854 19.7812 12.088C19.3004 14.3399 18.057 16.3568 16.2612 17.798C14.4874 19.2264 12.2776 20.0035 10.0002 20C8.28313 20.001 6.59479 19.5597 5.0978 18.7187C3.60081 17.8778 2.34562 16.6655 1.45318 15.1986C0.560729 13.7317 0.0610993 12.0597 0.00242265 10.3437C-0.056254 8.62764 0.328001 6.92542 1.11817 5.401C1.96114 3.77291 3.23555 2.40796 4.80204 1.4554C6.36853 0.502843 8.16679 -0.000642863 10.0002 6.16024e-07C12.4262 6.16024e-07 14.6512 0.864001 16.3832 2.302L13.1432 4.954C12.3842 4.48164 11.5285 4.18643 10.6397 4.09034C9.7509 3.99424 8.85188 4.09972 8.00947 4.39894C7.16706 4.69816 6.40294 5.18342 5.77391 5.81864C5.14488 6.45386 4.66712 7.2227 4.37617 8.068Z"
							fill="white"
						/>
					</svg>
					Войти с помощью Google
				</Button>
				<Button onClick={loginWithApple} className="flex w-full gap-4 px-12" appearance="primary" variant="button">
					<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M14.123 10.627C14.098 8.094 16.189 6.879 16.282 6.819C15.107 5.099 13.277 4.864 12.625 4.837C11.068 4.679 9.58601 5.754 8.79501 5.754C8.00701 5.754 6.78701 4.86 5.49501 4.884C3.79901 4.909 2.23401 5.87 1.36001 7.39C-0.403987 10.45 0.908013 14.985 2.62701 17.467C3.46701 18.682 4.46901 20.047 5.78401 19.997C7.05001 19.947 7.52901 19.178 9.06001 19.178C10.591 19.178 11.022 19.998 12.362 19.973C13.725 19.947 14.588 18.734 15.422 17.516C16.387 16.106 16.784 14.741 16.808 14.671C16.778 14.658 14.15 13.651 14.124 10.626L14.123 10.627ZM11.605 3.194C12.303 2.347 12.774 1.172 12.645 0C11.64 0.04 10.421 0.67 9.70001 1.515C9.05301 2.265 8.48601 3.46 8.63801 4.609C9.76001 4.697 10.906 4.039 11.605 3.194Z"
							fill="white"
						/>
					</svg>
					Войти с помощью Apple
				</Button>
			</div>
		</div>
	);
};
