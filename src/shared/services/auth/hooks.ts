import { useUnit } from 'effector-react';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './lib';
import { inputs, outputs } from './model';

export const useAuth = () => {
	const user = useUnit(outputs.$user);
	const isLoggedIn = useUnit(outputs.$isLoggedIn);
	const setUser = useUnit(inputs.setUser);
	const logout = useUnit(inputs.logout);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				logout();
			}
		});

		return () => unsubscribe();
	}, []);

	return { user, isLoggedIn };
};
