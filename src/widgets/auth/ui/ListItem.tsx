export const ListItem = () => {
	return (
		<div className="flex flex-col h-full w-[488px] bg-[#EEF1FF] rounded-2xl blur-sm items-start justify-start gap-8">
			<div className="flex flex-row justify-between items-center w-full p-10 ">
				<div className="bg-[#D1D9FF] h-8 w-60 rounded-lg"></div>
				<div className="w-[83px] h-[83px] bg-color-brand-primary-70 rounded-[32px]"></div>
			</div>
			<div className="flex flex-col justify-between items-start w-full p-10 gap-4">
				<div className="w-full h-[90px] bg-color-bg-100 rounded-2xl"></div>
				<div className="w-full h-[90px] bg-color-bg-100 rounded-2xl"></div>
				<div className="w-full h-[90px] bg-color-bg-100 rounded-2xl"></div>
			</div>
		</div>
	);
};
