import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { CalendarField } from '&shared/ui/calendar-field/component';
import { EntityCard } from '&shared/ui/entity-card';
import { FormSection } from '&shared/ui/form-section';
import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { Typography } from '&shared/ui/typography';
import { cn, getPlainErrors, unicodeToEmoji } from '&shared/utils';

import { timeService } from '&shared/services/time';
import { CalendarFieldShortcuts } from '&shared/ui/calendar-shortcuts';
import { ReminderFormFieldName, ReminderFormValues } from '../../model';
import { getReminderRepeatOptions, getReminderTimeOptions } from './constants';
import { Props } from './types';

const TIME_OPTIONS = getReminderTimeOptions();
const REPEAT_OPTIONS = getReminderRepeatOptions();

export function ReminderForm({ goalsToLinkTo, withCalendarShortcuts }: Props) {
	const {
		control,
		formState: { errors }
	} = useFormContext<ReminderFormValues>();
	const { field: titleField } = useController({ control, name: ReminderFormFieldName.Title });
	const { field: descriptionField } = useController({ control, name: ReminderFormFieldName.Description });
	const { field: targetDateField } = useController({ control, name: ReminderFormFieldName.TargetDate });
	const { field: targetTimeField } = useController({ control, name: ReminderFormFieldName.TargetTime });
	const { field: repeatRuleField } = useController({ control, name: ReminderFormFieldName.RepeatRule });
	const { field: linkedGoalIdField } = useController({ control, name: ReminderFormFieldName.LinkedGoalId });

	const plainErrors = React.useMemo(() => getPlainErrors(errors), [errors]);

	const goalsOptions = React.useMemo(
		() => goalsToLinkTo.map((goal) => ({ value: goal.id, label: goal.title, icon: goal.emoji })),
		[goalsToLinkTo]
	);

	const getFormattedTime = React.useCallback(() => {
		if (!targetTimeField.value) return '';

		const hours = Math.floor(targetTimeField.value / timeService.lib.HOUR);
		const minutes = ((targetTimeField.value - hours * timeService.lib.HOUR) / timeService.lib.MINUTE) % 60;

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}, [targetTimeField.value]);
	const [formattedTime, setFormattedTime] = React.useState<string>(getFormattedTime());

	const handleTimeChange = React.useCallback(
		(value?: string) => {
			setFormattedTime(value || '');
			if (!value) {
				targetTimeField.onChange(null);
				return;
			}

			const [hours = 0, minutes = 0] = value.split(':').map((part) => parseInt(part));

			targetTimeField.onChange(hours * timeService.lib.HOUR + minutes * timeService.lib.MINUTE);
		},
		[targetTimeField.onChange]
	);

	return (
		<div className="">
			<FormSection>
				<SeamlessInput
					label="Название напоминания"
					value={titleField.value}
					onChange={titleField.onChange}
					persistantLabel={false}
					inputClassName="text-heading-3 h-full text-color-text-and-icon-80"
					labelClassName="!text-heading-3 font-light"
					className="h-[39px] py-0"
					error={plainErrors[titleField.name]}
				/>
			</FormSection>
			<FormSection className="flex flex-col gap-4">
				{withCalendarShortcuts && (
					<CalendarFieldShortcuts
						onTomorrowPress={() =>
							targetDateField.onChange(timeService.lib.getStartOfTheDay(timeService.lib.getTomorrow()))
						}
						onTodayPress={() =>
							targetDateField.onChange(timeService.lib.getStartOfTheDay(timeService.lib.getCurrentTimestamp()))
						}
						onCalendarPress={() => {
							targetDateField.onChange(timeService.lib.getStartOfTheDay(timeService.lib.getDayAfterTomorrow()));
						}}
						value={targetDateField.value}
					/>
				)}
				<CalendarField
					value={targetDateField.value ? new Date(targetDateField.value) : null}
					mode="single"
					onChange={(date) => targetDateField.onChange(date.getTime())}
					label="Когда напомнить"
					leftSlot={<CalendarField.Icon name="calendar" />}
					error={plainErrors[targetDateField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessInput
					value={formattedTime}
					onChange={handleTimeChange}
					mask="__:__"
					maskReplacment={{ _: /\d/ }}
					label="Время напоминания"
					className="text-color-text-and-icon-80"
					leftSlot={<SeamlessSelect.Icon name="watch" />}
					inputClassName="max-w-[194px]"
					error={plainErrors[targetTimeField.name]}
					suggestions={TIME_OPTIONS}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					options={REPEAT_OPTIONS}
					value={repeatRuleField.value}
					onChange={(value?: string) => repeatRuleField.onChange(value ?? null)}
					label="Повторять"
					className="text-color-text-and-icon-80"
					leftSlot={<SeamlessSelect.Icon name="refresh" />}
					clearable={false}
					error={plainErrors[repeatRuleField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessInput
					label="Описание"
					leftSlot={<SeamlessInput.Icon name="description" />}
					value={descriptionField.value || ''}
					onChange={(value) => descriptionField.onChange(value || null)}
					multiline
					inputClassName="text-color-text-and-icon-80"
					error={plainErrors[descriptionField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					label="Прикрепить цель"
					emptyOptionsSlot={
						<Typography className="text-center text-color-gray-80">
							Нельзя просто так взять и прикрепить цель, если еще не создано ни одной цели 😉
						</Typography>
					}
					leftSlot={<SeamlessSelect.Icon name="goal" />}
					className={cn('h-16 w-full gap-4', { 'py-0': Boolean(linkedGoalIdField.value) })}
					inputClassName="md:max-w-full w-full pl-0"
					contentWrapperClassName="md:max-w-[calc(590px-88px)]"
					value={linkedGoalIdField.value || undefined}
					options={goalsOptions}
					onChange={(goalId) => linkedGoalIdField.onChange(goalId || null)}
					error={plainErrors[linkedGoalIdField.name]}
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
