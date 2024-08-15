import React from 'react';
import { ru } from 'date-fns/locale';
import { DayPicker, UI } from 'react-day-picker';
import 'react-day-picker/style.css';
import { cn } from '&shared/utils';

export function InlineCalendar({ className }: { className?: string }) {
	const [selected, setSelected] = React.useState<Date>();
	return (
		<DayPicker
			mode="single"
			selected={selected}
			onSelect={setSelected}
			className={cn('h-full', className)}
			classNames={{
				today: 'today',
				selected: 'text-white selected',
				[UI.Day]: 'w-[36px] h-[36px] text-caption-1 font-semibold text-text-and-icon-80 p-0 group',
				[UI.DayButton]:
					'w-[36px] h-[36px] !border-transparent !border !border-solid rounded-xl group-[.selected]:bg-color-brand-primary-50 group-[.today]:!border-color-brand-primary-50 ',
				[UI.MonthCaption]: 'pl-3 text-default font-semibold h-10 flex items-center mb-4 capitalize',
				[UI.Nav]: 'h-10 absolute top-0 right-0',
				[UI.Weekday]:
					'text-color-text-and-icon-70 opacity-50 text-caption-1 font-normal [&:nth-child(n+6)]:text-color-error',
				[UI.ButtonPrevious]: '[--rdp-accent-color:var(--color-text-and-icon-80)] h-10 w-9',
				[UI.ButtonNext]: '[--rdp-accent-color:var(--color-text-and-icon-80)] h-10 w-9'
			}}
			locale={ru}
		/>
	);
}
