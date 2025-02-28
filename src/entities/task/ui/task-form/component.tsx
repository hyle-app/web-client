import React from 'react';

import { Subtask } from '&entities/task/model';
import { FormSection } from '&shared/ui/form-section';
import { Icon } from '&shared/ui/icon';
import { SeamlessArrayInput } from '&shared/ui/seamless-array-input';
import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { cn, generateTemporaryId, getPlainErrors, unicodeToEmoji } from '&shared/utils';

import { TaskFormFieldName } from '&entities/task/model/constants';
import { TaskFormValues } from '&entities/task/model/types';
import { timeService } from '&shared/services/time';
import { CalendarField } from '&shared/ui/calendar-field/component';
import { CalendarFieldShortcuts } from '&shared/ui/calendar-shortcuts';
import { EntityCard } from '&shared/ui/entity-card';
import { ErrorMessage } from '&shared/ui/error-message';
import { Typography } from '&shared/ui/typography';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { SubtaskCard } from '../subtask-card';
import { getReminderTimeOptions } from './constants';
import { Props } from './types';

const TIME_OPTIONS = getReminderTimeOptions();

export function TaskForm({ goalsToLinkTo, withCalendarShortcuts }: Props) {
	const {
		control,
		formState: { errors }
	} = useFormContext<TaskFormValues>();
	const { field: titleField } = useController({
		control,
		name: TaskFormFieldName.Title
	});
	const { field: descriptionField } = useController({
		control,
		name: TaskFormFieldName.Description
	});
	const { field: expirationDateRangeField } = useController({
		control,
		name: TaskFormFieldName.ExpirationDateRange
	});
	const { field: reminderTimeField } = useController({
		control,
		name: TaskFormFieldName.ReminderTime
	});
	const {
		append: appendSubtask,
		remove: removeSubtask,
		fields: subtasks
	} = useFieldArray({
		control,
		name: TaskFormFieldName.Subtasks
	});
	const { field: linkedGoalIdField } = useController({
		control,
		name: TaskFormFieldName.LinkedGoalId
	});

	const plainErrors = React.useMemo(() => getPlainErrors(errors), [errors]);

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
					value={titleField.value}
					onChange={titleField.onChange}
					persistantLabel={false}
					inputClassName="text-heading-3 h-full"
					labelClassName="!text-heading-3 font-light"
					className="h-[39px] py-0 text-color-text-and-icon-80"
					error={plainErrors[titleField.name]}
				/>
			</FormSection>
			<FormSection className="flex flex-col gap-4">
				{withCalendarShortcuts && (
					<CalendarFieldShortcuts
						onTomorrowPress={() =>
							expirationDateRangeField.onChange([
								new Date(timeService.lib.getEndOfTheDay(timeService.lib.getTomorrow())),
								null
							])
						}
						onTodayPress={() =>
							expirationDateRangeField.onChange([
								new Date(timeService.lib.getEndOfTheDay(timeService.lib.getCurrentTimestamp())),
								null
							])
						}
						onCalendarPress={() => {
							expirationDateRangeField.onChange([
								new Date(timeService.lib.getEndOfTheDay(timeService.lib.getDayAfterTomorrow())),
								null
							]);
						}}
						value={[expirationDateRangeField.value[0].getTime(), expirationDateRangeField.value[1]?.getTime() ?? null]}
					/>
				)}
				<CalendarField
					value={expirationDateRangeField.value}
					mode="range"
					onChange={(value) =>
						expirationDateRangeField.onChange([
							new Date(timeService.lib.getEndOfTheDay(value[0].getTime())),
							value[1]?.getTime() ? new Date(timeService.lib.getEndOfTheDay(value[1].getTime())) : null
						])
					}
					label="Срок выполнения"
					leftSlot={<CalendarField.Icon name="calendar" />}
					error={plainErrors[expirationDateRangeField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect<string>
					options={TIME_OPTIONS}
					value={reminderTimeField.value?.toString() ?? undefined}
					onChange={(value) =>
						value === undefined ? reminderTimeField.onChange(value) : reminderTimeField.onChange(parseInt(value))
					}
					label="Напомнить"
					className="text-color-text-and-icon-80"
					leftSlot={<SeamlessSelect.Icon name="bell" />}
					error={plainErrors[reminderTimeField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessInput
					label="Описание"
					leftSlot={<SeamlessInput.Icon name="description" />}
					value={descriptionField.value || ''}
					onChange={descriptionField.onChange}
					multiline
					inputClassName="text-color-text-and-icon-80"
					error={plainErrors[descriptionField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessArrayInput<Subtask>
					groupLabel="Подзадачи"
					inputLabel={hasSubtasks ? 'Создать подзадачу' : 'Подзадачи'}
					value={subtasks}
					onAppendNewValue={(subtask) => appendSubtask(subtask)}
					newValueContructor={(title) => ({
						id: generateTemporaryId(),
						title,
						isCompleted: false
					})}
					inputClassName="text-color-text-and-icon-80"
					inputLeftSlot={<SeamlessInput.Icon name="subtask" />}
					renderElement={(subtask, index) => (
						<div className="flex flex-col gap-1" key={subtask.id}>
							<div className="group relative flex gap-3">
								<SubtaskCard isCompleted={subtask.isCompleted}>{subtask.title}</SubtaskCard>
								<button
									className="flex w-8 items-center justify-center self-stretch opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
									onClick={() => removeSubtask(index)}
								>
									<Icon name="plus" className="h-5 w-5 rotate-45 text-color-error" />
								</button>
							</div>
							{plainErrors[`${TaskFormFieldName.Subtasks}.${index}.title` as keyof typeof plainErrors] && (
								<ErrorMessage>
									{plainErrors[`${TaskFormFieldName.Subtasks}.${index}.title` as keyof typeof plainErrors]}
								</ErrorMessage>
							)}
						</div>
					)}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					label="Прикрепить цель"
					leftSlot={<SeamlessSelect.Icon name="goal" />}
					className={cn('h-16 w-full gap-4', { 'py-0': Boolean(linkedGoalIdField.value) })}
					inputClassName="md:max-w-full w-full pl-0"
					contentWrapperClassName="md:max-w-[calc(590px-88px)]"
					value={linkedGoalIdField.value ?? ''}
					options={goalsOptions}
					emptyOptionsSlot={
						<Typography className="text-center text-color-gray-80">
							Нельзя просто так взять и прикрепить цель, если еще не создано ни одной цели 😉
						</Typography>
					}
					onChange={(goalId) => linkedGoalIdField.onChange(goalId || null)}
					renderOption={({ option }) => (
						<div>
							<EntityCard
								className="duratin-300 w-full transition-colors hover:bg-[#f9faff]"
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

TaskForm.FieldName = TaskFormFieldName;
