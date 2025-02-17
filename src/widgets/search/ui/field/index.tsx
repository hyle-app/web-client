import { Icon } from '&shared/ui/icon';
import { Input } from '&shared/ui/input';
import { Popover } from '&shared/ui/popover';
import { useUnit } from 'effector-react';
import { inputs, outputs } from '../../model';
import React, { MutableRefObject } from 'react';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { EntityCard } from '&shared/ui/entity-card';

type Props = React.HTMLAttributes<HTMLDivElement> & {
	onClose: () => void;
	inputClassName?: HTMLDivElement['className'];
	inputRef?: MutableRefObject<HTMLInputElement | null>;
};

export const SearchField = ({ className, onClose, inputClassName, inputRef, ...attrs }: Props) => {
	const { changeQueryEvent, query, resetQueryEvent, searchResults, isLoading } = useUnit({
		changeQueryEvent: inputs.changeQuery,
		query: outputs.$query,
		resetQueryEvent: inputs.resetQuery,
		searchResults: outputs.$searchResults,
		isLoading: outputs.$isSearchLoading
	});
	const ref = React.useRef(null);

	const hasReminders = searchResults.reminders.length > 0;
	const hasTasks = searchResults.tasks.length > 0;
	const hasHabits = searchResults.habits.length > 0;

	const resultsContent = (
		<>
			{hasHabits && (
				<div>
					<div className="px-4 py-2 flex gap-3 items-center">
						<Icon name="habit" className="w-6 h-6" />
						<Typography variant="heading-5" className="font-semibold">
							Привычки
						</Typography>
					</div>
					<div>
						{searchResults.habits.map((task) => (
							<button className="py-2 px-4" key={task.id}>
								{task.title}
							</button>
						))}
					</div>
				</div>
			)}

			{hasTasks && (
				<div>
					<div className="px-4 py-2 flex gap-3 items-center">
						<Icon name="flag" className="w-6 h-6" />
						<Typography variant="heading-5" className="font-semibold">
							Задачи
						</Typography>
					</div>
					<div>
						{searchResults.tasks.map((task) => (
							<button className="py-2 px-4" key={task.id}>
								{task.title}
							</button>
						))}
					</div>
				</div>
			)}

			{hasReminders && (
				<div>
					<div className="px-4 py-2 flex gap-3 items-center">
						<Icon name="alarm-clock" className="w-6 h-6" />
						<Typography variant="heading-5" className="font-semibold">
							Напоминания
						</Typography>
					</div>
					<div>
						{searchResults.reminders.map((task) => (
							<button className="py-2 px-4" key={task.id}>
								{task.title}
							</button>
						))}
					</div>
				</div>
			)}
		</>
	);

	const loader = (
		<div className="w-full flex justify-center items-center pt-3 ">
			<EntityCard.ProgressCircleBar progressValue={0.6} className="animate-spin duration-300 origin-center" />
		</div>
	);

	const isEmptyResults = !hasReminders && !hasTasks && !hasHabits;
	const view = React.useMemo(() => {
		if (isLoading) {
			return loader;
		}

		if (isEmptyResults) {
			return (
				<Typography variant="paragraph" className="w-full text-center pt-3">
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
					label=""
					ref={inputRef}
					onChange={(event) => changeQueryEvent(event.target.value)}
					placeholder="Введите название"
					inputClassName={cn('pl-12 py-3', inputClassName)}
					leftSlot={<Icon name="search" className="absolute top-1/2 -translate-y-1/2 left-4" />}
				/>
			</Popover>
		</div>
	);
};
