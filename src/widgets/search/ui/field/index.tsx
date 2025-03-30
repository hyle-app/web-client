import { EntityCard } from '&shared/ui/entity-card';
import { Icon } from '&shared/ui/icon';
import { Input } from '&shared/ui/input';
import { Popover } from '&shared/ui/popover';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { useUnit } from 'effector-react';
import { Search } from 'lucide-react';
import React, { MutableRefObject } from 'react';
import { inputs, outputs } from '../../model';

type Props = React.HTMLAttributes<HTMLDivElement> & {
	onClose: () => void;
	inputClassName?: HTMLDivElement['className'];
	inputRef?: MutableRefObject<HTMLInputElement | null>;
};

export const SearchField = ({ className, onClose, inputClassName, inputRef, ...attrs }: Props) => {
	const {
		setSelectedTaskIdEvent,
		setSelectedHabitIdEvent,
		setSelectedReminderIdEvent,
		changeQueryEvent,
		query,
		resetQueryEvent,
		searchResults,
		isLoading
	} = useUnit({
		changeQueryEvent: inputs.changeQuery,
		query: outputs.$query,
		resetQueryEvent: inputs.resetQuery,
		searchResults: outputs.$searchResults,
		isLoading: outputs.$isSearchLoading,
		setSelectedHabitIdEvent: inputs.setSelectedHabitId,
		setSelectedTaskIdEvent: inputs.setSelectedTaskId,
		setSelectedReminderIdEvent: inputs.setSelectedReminderId
	});
	const ref = React.useRef(null);

	const hasReminders = searchResults.reminders.length > 0;
	const hasTasks = searchResults.tasks.length > 0;
	const hasHabits = searchResults.habits.length > 0;

	const resultsContent = (
		<>
			{hasHabits && (
				<div>
					<div className="flex items-center gap-3 px-4 py-2">
						<Icon name="habit" className="h-6 w-6" />
						<Typography variant="heading-5" className="font-semibold">
							Привычки
						</Typography>
					</div>
					<div>
						{searchResults.habits.map((task) => (
							<button className="px-4 py-2" key={task.id} onClick={() => setSelectedHabitIdEvent({ value: task.id })}>
								{task.title}
							</button>
						))}
					</div>
				</div>
			)}

			{hasTasks && (
				<div>
					<div className="flex items-center gap-3 px-4 py-2">
						<Icon name="flag" className="h-6 w-6" />
						<Typography variant="heading-5" className="font-semibold">
							Задачи
						</Typography>
					</div>
					<div>
						{searchResults.tasks.map((task) => (
							<button className="px-4 py-2" key={task.id} onClick={() => setSelectedTaskIdEvent({ value: task.id })}>
								{task.title}
							</button>
						))}
					</div>
				</div>
			)}

			{hasReminders && (
				<div>
					<div className="flex items-center gap-3 px-4 py-2">
						<Icon name="alarm-clock" className="h-6 w-6" />
						<Typography variant="heading-5" className="font-semibold">
							Напоминания
						</Typography>
					</div>
					<div>
						{searchResults.reminders.map((task) => (
							<button
								className="px-4 py-2"
								key={task.id}
								onClick={() => setSelectedReminderIdEvent({ value: task.id })}
							>
								{task.title}
							</button>
						))}
					</div>
				</div>
			)}
		</>
	);

	const loader = (
		<div className="flex w-full items-center justify-center pt-3">
			<EntityCard.ProgressCircleBar progressValue={0.6} className="origin-center animate-spin duration-300" />
		</div>
	);

	const isEmptyResults = !hasReminders && !hasTasks && !hasHabits;
	const view = React.useMemo(() => {
		if (isLoading) {
			return loader;
		}

		if (isEmptyResults) {
			return (
				<Typography variant="paragraph" className="w-full pt-3 text-center text-color-gray-80">
					Ничего не найдено
				</Typography>
			);
		}

		return resultsContent;
	}, [loader, resultsContent, isEmptyResults, isLoading]);

	return (
		<div ref={ref} className={className} {...attrs}>
			<Popover
				content={<div className="pb-3">{view}</div>}
				isOpen={query.length > 0}
				onClose={() => {
					onClose();
					resetQueryEvent();
				}}
				portalContainerRef={ref}
				contentClassName="w-[var(--radix-popover-trigger-width)] shadow-search"
				autoFocusContent={false}
			>
				<Input
					className="text-color-text-and-icon-80"
					label=""
					ref={inputRef}
					onChange={(event) => changeQueryEvent(event.target.value)}
					placeholder="Введите название"
					inputClassName={cn('pl-12 py-3', inputClassName)}
					leftSlot={<Search size={24} className="absolute left-4 top-1/2 -translate-y-1/2" />}
				/>
			</Popover>
		</div>
	);
};
