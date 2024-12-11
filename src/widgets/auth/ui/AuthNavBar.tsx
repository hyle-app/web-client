import { Logo } from '&shared/ui/logo';

export const AuthNavBar = () => {
	return (
		<nav className="w-full px-12 py-12 flex flex-row justify-between">
			<div className="w-20 h-10 flex items-center justify-center">
				<Logo />
			</div>
			<div className="flex items-center gap-4 blur-sm">
				<div className="w-[45px] h-[47px] bg-[#E1E6FF] rounded-lg"></div>
				<div className="w-[45px] h-[47px] bg-[#E1E6FF] rounded-lg"></div>
				<div className="w-[345px] h-[47px] bg-[#E1E6FF] rounded-lg"></div>
			</div>
		</nav>
	);
};
