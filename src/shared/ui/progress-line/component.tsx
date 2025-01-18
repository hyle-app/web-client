import { clamp, cn, map } from '&shared/utils';
import { Typography } from '../typography';
import { Props } from './types';

export function ProgressLine({
	className,
	withDayLabel,
	customLabel,
	value,
	maxValue,
	variant = 'primary',
	direction = 'direct',
	labelRowEndSlot
}: Props) {
	const textColorClassName = variant === 'primary' ? 'text-color-brand-secondary-80' : 'text-color-brand-primary-70';
	const bgColorClassName = variant === 'primary' ? 'bg-color-brand-secondary-80' : 'bg-color-brand-primary-70';
	return (
		<div
			className={cn(
				'flex gap-2 w-full',
				{
					'flex-col-reverse': direction === 'inverse',
					'flex-col': direction === 'direct'
				},
				className
			)}
		>
			<div className="flex justify-between">
				<Typography className="text-color-gray-80 font-semibold">
					<span>{value}</span>
					{withDayLabel && <span> день</span>} из{' '}
					<span className={textColorClassName}>
						{maxValue}
						{customLabel && ` ${customLabel}`}
					</span>
				</Typography>
				{labelRowEndSlot}
			</div>
			<div className="w-full bg-color-gray-30 h-[3px] rounded-xl">
				<div
					style={{ width: map(clamp(0, 1, value / maxValue), 0, 1, 0, 100) + '%' }}
					className={cn('h-[3px] rounded-xl', bgColorClassName)}
				></div>
			</div>
		</div>
	);
}
