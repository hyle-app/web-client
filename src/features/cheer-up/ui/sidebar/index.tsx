import { Sidebar } from '&shared/ui/sidebar';
import { useUnit } from 'effector-react';
import { inputs, internals } from '../../model';
import { clamp, cn } from '&shared/utils';
import { Typography } from '&shared/ui/typography';
import React from 'react';
import { Button } from '&shared/ui/button';

export const CheerUpSidebar = () => {
	const { isOpen, onClose, details } = useUnit({
		isOpen: internals.$isOpen,
		details: internals.$details,
		onClose: inputs.closeCheerupSidebar
	});

	const [currentProgress, setCurrentProgress] = React.useState(details?.progress.old ?? 0);

	React.useLayoutEffect(() => {
		if (!details) return;

		setCurrentProgress(details.progress.old);
		const n = details.progress.new;
		const id = setTimeout(setCurrentProgress, 1000, n);
		return () => clearTimeout(id);
	}, [details]);

	const strokeWidth = 32;
	const r = 109 - strokeWidth / 2;
	const circumference = Math.round(2 * Math.PI * r);

	const finalProgressValue = (details?.progress.new ?? 0) / (details?.progress.target ?? 1);
	const progressValue = clamp(0, 1, (currentProgress ?? 0) / (details?.progress.target ?? 1));
	const isAlmostCompleted = finalProgressValue > 0.5;

	return (
		<Sidebar isOpen={isOpen} onClose={onClose}>
			<div className="h-full w-full flex flex-col justify-between items-center pb-8 px-8">
				<div></div>
				<div className="w-full flex flex-col items-center gap-8">
					<Typography variant="heading-3" className="font-semibold">
						Молодец!
					</Typography>
					<svg viewBox="0 0 218 218" className={cn('w-[218px] h-[218px] stroke-color-brand-primary-50')}>
						<circle
							cx="109"
							cy="109"
							r={r}
							fill="none"
							strokeWidth={strokeWidth}
							strokeLinecap="round"
							className="opacity-15"
						/>
						<circle
							className="transition-all duration-500"
							cx="109"
							cy="109"
							r={r}
							fill="none"
							strokeWidth={strokeWidth}
							strokeLinecap="round"
							strokeDasharray={circumference}
							strokeDashoffset={circumference * (1 - progressValue)}
							transform="rotate(-90 109 109)"
						/>
						<g
							transform={`translate(${r - 7}, ${r}) scale(5)`}
							className={cn('transition-opacity duration-300 opacity-0', { 'opacity-1': progressValue === 1 })}
						>
							<path
								d="M3.99074 6.15294C3.90323 6.15311 3.81655 6.13601 3.73566 6.1026C3.65478 6.0692 3.58129 6.02015 3.51941 5.95827L0.691407 3.1296C0.627691 3.06815 0.576852 2.99462 0.541857 2.91331C0.506861 2.832 0.488409 2.74453 0.487578 2.65602C0.486747 2.5675 0.503553 2.4797 0.537016 2.39775C0.570478 2.31579 0.619927 2.24133 0.682478 2.17869C0.745028 2.11605 0.819427 2.06649 0.901333 2.03291C0.983239 1.99934 1.07101 1.98241 1.15953 1.98311C1.24805 1.98382 1.33554 2.00215 1.4169 2.03703C1.49826 2.07191 1.57186 2.12264 1.63341 2.18627L3.99007 4.54294L8.23341 0.300937C8.35841 0.175843 8.52799 0.105531 8.70484 0.105469C8.88168 0.105406 9.05131 0.175598 9.17641 0.300604C9.3015 0.425609 9.37181 0.595188 9.37187 0.772035C9.37194 0.948882 9.30174 1.11851 9.17674 1.2436L4.46207 5.95827C4.40019 6.02015 4.3267 6.0692 4.24582 6.1026C4.16493 6.13601 4.07825 6.15311 3.99074 6.15294Z"
								className="stroke-color-brand-primary-50 fill-color-brand-primary-50"
							/>
						</g>
					</svg>
					<div className="text-center flex flex-col gap-2">
						{isAlmostCompleted && (
							<Typography variant="paragraph" className="text-color-gray-80">
								Еще немного!
							</Typography>
						)}
						<Typography variant="heading-4" className="font-semibold text-color-gray-50">
							<span>{details?.progress.new}</span> из{' '}
							<span className="text-color-text-and-icon-80">
								{details?.progress.target} {details?.label && details.label}
							</span>
						</Typography>
					</div>
				</div>
				<Button appearance="primary" className="w-full" onClick={onClose}>
					Спасибо &nbsp;😊
				</Button>
			</div>
		</Sidebar>
	);
};
