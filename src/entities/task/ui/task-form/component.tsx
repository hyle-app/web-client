import React from 'react';

import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { FormSection } from '&shared/ui/form-section';
import { Subtask } from '&entities/task/model';
import { generateTemporaryId, unicodeToEmoji } from '&shared/utils';
import { Icon } from '&shared/ui/icon';
import { SeamlessArrayInput } from '&shared/ui/seamless-array-input';

import { getReminderTimeOptions } from './constants';
import { SubtaskCard } from '../subtask-card';
import { Props } from './types';
import { EntityCard } from '&shared/ui/entity-card';
import { Typography } from '&shared/ui/typography';
import { CalendarField } from '&shared/ui/calendar-field/component';

const TIME_OPTIONS = getReminderTimeOptions();

export function TaskForm({ goalsToLinkTo }: Props) {
	const [title, setTitle] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');
	const [selectValue, setSelectValue] = React.useState<string | undefined>(undefined);
	const [subtasks, setSubtasks] = React.useState<Subtask[]>([]);
	const [selectedGoalId, setSelectedGoalId] = React.useState<null | string>(null);
	const [date, setDate] = React.useState<[Date | null, Date | null]>([null, null]);

	const handleDeleteSubtask = React.useCallback((id: string) => {
		setSubtasks((prev) => prev.filter((subtask) => subtask.id !== id));
	}, []);

	const hasSubtasks = subtasks.length > 0;
	const goalsOptions = React.useMemo(
		() => goalsToLinkTo.map((goal) => ({ value: goal.id, label: goal.title, icon: goal.emoji })),
		[goalsToLinkTo]
	);

	return (
		<div className="">
			<FormSection>
				<SeamlessInput
					label="Название задачи"
					value={title}
					onChange={setTitle}
					persistantLabel={false}
					inputClassName="text-heading-3 h-full"
					labelClassName="!text-heading-3 font-normal"
					className="h-[39px] py-0"
				/>
			</FormSection>
			<FormSection>
				<CalendarField
					value={date}
					mode="range"
					onChange={(val) => {
						console.log(val);
						setDate(val);
					}}
					label="Срок выполнения"
					leftSlot={<CalendarField.Icon name="calendar" />}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					options={TIME_OPTIONS}
					value={selectValue}
					hideLeftSlotWhenHasContnent={false}
					onChange={setSelectValue}
					label="Напомнить"
					leftSlot={<SeamlessSelect.Icon name="bell" />}
				/>
			</FormSection>
			<FormSection>
				<SeamlessInput
					label="описание"
					leftSlot={<SeamlessInput.Icon name="plus" />}
					value={value}
					onChange={setValue}
					multiline
				/>
			</FormSection>
			<FormSection>
				<SeamlessArrayInput<Subtask>
					groupLabel="Подзадачи"
					inputLabel={hasSubtasks ? 'Создать подзадачу' : 'Подзадачи'}
					value={subtasks}
					onChange={(subtasks) => setSubtasks(subtasks)}
					newValueContructor={(title) => ({
						id: generateTemporaryId(),
						title,
						isCompleted: false
					})}
					inputLeftSlot={<SeamlessInput.Icon name="plus" />}
					renderElement={(subtask) => (
						<div className="group flex gap-3">
							<SubtaskCard isCompleted={subtask.isCompleted}>{subtask.title}</SubtaskCard>
							<button
								className="w-8 self-stretch flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => handleDeleteSubtask(subtask.id)}
							>
								<Icon name="plus" className="text-color-error rotate-45 h-5 w-5" />
							</button>
						</div>
					)}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					label="Прикрепить цель"
					leftSlot={<SeamlessSelect.Icon name="pin" />}
					className="w-full"
					inputClassName="md:max-w-full w-full"
					contentWrapperClassName="md:max-w-[calc(590px-88px)]"
					value={selectedGoalId ?? ''}
					options={goalsOptions}
					onChange={(goalId) => setSelectedGoalId(goalId || null)}
					renderOption={({ option }) => (
						<div>
							<EntityCard
								className="w-full"
								titleSlot={
									<Typography variant="paragraph" className="text-color-text-and-icon-80">
										{option.label}
									</Typography>
								}
								leftSlot={option.icon && <EntityCard.Emoji code={unicodeToEmoji(option.icon)} className="shrink-0" />}
							/>
						</div>
					)}
					renderSelected={(option) => (
						<div>
							<EntityCard
								className="w-full"
								titleSlot={
									<Typography variant="paragraph" className="text-color-text-and-icon-80">
										{option.label}
									</Typography>
								}
								leftSlot={option.icon && <EntityCard.Emoji code={unicodeToEmoji(option.icon)} className="shrink-0" />}
							/>
						</div>
					)}
				/>
			</FormSection>
		</div>
	);
}
