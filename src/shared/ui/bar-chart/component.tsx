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
				'mx-auto grid h-full w-full max-w-[522px] grid-cols-6 items-center justify-center gap-3',
				className
			)}
			{...attributes}
		>
			{cols.map(([id, data]) => {
				const coloredBarHeightValue = map(Number(data), 0, 1, 0.1, 1);
				const coloredBarPercentageHeight = Math.floor(100 * coloredBarHeightValue);

				return (
					<div className="flex flex-col items-center gap-4" key={id}>
						<Typography className="text-color-text-and-icon-80">{getLabel(id as T)}</Typography>
						<div className="relative flex h-[269px] w-full flex-col justify-end rounded-[8px] bg-color-gray-10 p-[6px] shadow-balance-chart-col">
							<div
								style={{
									height: coloredBarPercentageHeight + '%',
									background: 'var(--color-brand-solid-gradient)'
								}}
								className="w-full overflow-hidden rounded-[5px] bg-color-brand-solid-gradient backdrop-brightness-200"
							></div>
						</div>
						<Typography className="text-heading-3 font-medium text-color-gray-80">
							{Math.floor(Number(data) * 10)}
						</Typography>
					</div>
				);
			})}
		</div>
	);
}
