import React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { FormSection } from '&shared/ui/form-section';
import { getPlainErrors, unicodeToEmoji } from '&shared/utils';
import { EntityCard } from '&shared/ui/entity-card';
import { Typography } from '&shared/ui/typography';
import { CalendarField } from '&shared/ui/calendar-field/component';

import { getReminderRepeatOptions, getReminderTimeOptions } from './constants';
import { Props } from './types';
import { ReminderFormFieldName, ReminderFormValues } from '../../model';
import { CalendarFieldShortcuts } from '&shared/ui/calendar-shortcuts';
import { timeService } from '&shared/services/time';

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

	return (
		<div className="">
			<FormSection>
				<SeamlessInput
					label="Название напоминания"
					value={titleField.value}
					onChange={titleField.onChange}
					persistantLabel={false}
					inputClassName="text-heading-3 h-full"
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
				<SeamlessSelect
					options={TIME_OPTIONS}
					value={targetTimeField.value ? targetTimeField.value.toString() : undefined}
					onChange={(value: string | undefined) => targetTimeField.onChange(value ? parseInt(value) : null)}
					label="Время напоминания"
					leftSlot={<SeamlessSelect.Icon name="watch" />}
					inputClassName="max-w-[194px]"
					error={plainErrors[targetTimeField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					options={REPEAT_OPTIONS}
					value={repeatRuleField.value}
					onChange={(value: string | undefined) => repeatRuleField.onChange(value ?? null)}
					label="Повторять"
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
					error={plainErrors[descriptionField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					label="Прикрепить цель"
					leftSlot={<SeamlessSelect.Icon name="goal" />}
					className="w-full"
					inputClassName="md:max-w-full w-full"
					contentWrapperClassName="md:max-w-[calc(590px-88px)]"
					value={linkedGoalIdField.value || undefined}
					options={goalsOptions}
					onChange={(goalId) => linkedGoalIdField.onChange(goalId || null)}
					error={plainErrors[linkedGoalIdField.name]}
					hideLeftSlotWhenHasContnent
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
