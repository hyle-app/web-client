import React from 'react';
import { Props } from './types';
import { cn, map } from '&shared/utils';
import { Typography } from '../typography';

const BAR_HEIGHT = 269;
const BAR_PADDING = 6;

export function BarChart<T extends string | symbol | number>({ data, getLabel, className, ...attributes }: Props<T>) {
	const cols = React.useMemo(() => Object.entries(data), [data]);

	return (
		<div
			className={cn(
				'grid grid-cols-6 gap-3 w-full h-full items-center justify-center max-w-[522px] mx-auto',
				className
			)}
			{...attributes}
		>
			{cols.map(([id, data]) => {
				const coloredBarHeightValue = map(Number(data), 0, 1, 0.1, 1);
				const coloredBarPercentageHeight = Math.floor(100 * coloredBarHeightValue);

				return (
					<div className="flex flex-col gap-4 items-center " key={id}>
						<Typography className="text-color-text-and-icon-80">{getLabel(id as T)}</Typography>
						<div className="h-[269px] w-full relative p-[6px] bg-color-gray-10 rounded-[8px] shadow-balance-chart-col flex flex-col justify-end">
							<Typography className="absolute font-medium top-3 left-1/2 -translate-x-1/2 text-color-gray-80">
								{Math.floor(Number(data) * 10)}
							</Typography>
							<div
								style={{
									height: coloredBarPercentageHeight + '%',
									background: 'var(--color-brand-solid-gradient)'
								}}
								className="w-full bg-color-brand-solid-gradient rounded-[5px] backdrop-brightness-200 overflow-hidden"
							>
								<Typography
									className="absolute font-medium top-[6px] left-1/2 text-color-white"
									style={{
										transform: `translateX(-50%) translateY(-${(BAR_HEIGHT + BAR_PADDING * 3) * (1 - coloredBarHeightValue)}px)`
									}}
								>
									{Math.floor(Number(data) * 10)}
								</Typography>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
