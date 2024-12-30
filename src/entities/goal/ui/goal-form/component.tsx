import { useController, useFormContext } from 'react-hook-form';
import { Props } from './types';
import { GoalFormFieldName, type GoalFormValues } from '../../model';
import React from 'react';
import { getPlainErrors } from '&shared/utils';
import { FormSection } from '&shared/ui/form-section';
import { EmojiPickerField } from '&shared/ui/emoji-picker';
import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { BalanceCategory } from '&shared/constants';
import { CalendarField } from '&shared/ui/calendar-field/component';
import { CalendarFieldShortcuts } from '&shared/ui/calendar-shortcuts';
import { timeService } from '&shared/services/time';
import { ALLOWED_GOAL_WEIGHTS } from '&entities/goal/model/constants';

const CATEGORY_LABEL_MAP: Record<BalanceCategory, string> = {
	[BalanceCategory.Health]: 'Здоровье',
	[BalanceCategory.Family]: 'Семья',
	[BalanceCategory.Career]: 'Работа',
	[BalanceCategory.Hobby]: 'Хобби',
	[BalanceCategory.Finance]: 'Финансы',
	[BalanceCategory.Friends]: 'Друзья'
};

const CATEGORY_OPTIONS = Object.values(BalanceCategory).map((value) => ({
	value,
	label: CATEGORY_LABEL_MAP[value as BalanceCategory]
}));

const WEIGHT_OPTIONS = ALLOWED_GOAL_WEIGHTS.map((weight) => ({ value: weight.toString(), label: weight.toString() }));

export function GoalForm({ withCalendarShortcuts, disabled }: Props) {
	const {
		control,
		formState: { errors }
	} = useFormContext<GoalFormValues>();

	const plainErrors = React.useMemo(() => getPlainErrors(errors), [errors]);

	const { field: titleField } = useController({ control, name: GoalFormFieldName.Title });
	const { field: descriptionField } = useController({ control, name: GoalFormFieldName.Description });
	const { field: emojiField } = useController({ control, name: GoalFormFieldName.Emoji });
	const { field: targetDateField } = useController({ control, name: GoalFormFieldName.TargetDate });
	const { field: categoryField } = useController({ control, name: GoalFormFieldName.Category });
	const { field: weightField } = useController({ control, name: GoalFormFieldName.Weight });
	const { field: progressDetailsCountField } = useController({ control, name: GoalFormFieldName.ProgressDetailsCount });
	const { field: progressDetailsLabelField } = useController({ control, name: GoalFormFieldName.ProgressDetailsLabel });

	return (
		<div>
			<FormSection className="flex gap-2 items-center">
				<EmojiPickerField value={emojiField.value ?? undefined} onChange={emojiField.onChange} />
				<SeamlessInput
					label="Название цели"
					value={titleField.value}
					onChange={titleField.onChange}
					error={plainErrors[titleField.name]}
					persistantLabel={false}
					inputClassName="text-heading-3 h-full"
					labelClassName="!text-heading-3 font-light"
					className="h-[39px] py-0"
					disabled={disabled}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect<string>
					value={categoryField.value || undefined}
					onChange={categoryField.onChange}
					leftSlot={<SeamlessSelect.Icon name="balance" />}
					options={CATEGORY_OPTIONS}
					error={plainErrors[categoryField.name]}
					label="Категория"
					clearable={false}
					disabled={disabled}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect<string>
					label="Вес цели"
					value={weightField.value.toString()}
					onChange={(value) => weightField.onChange(Number(value))}
					leftSlot={<SeamlessSelect.Icon name="scale" />}
					options={WEIGHT_OPTIONS}
					error={plainErrors[weightField.name]}
					clearable={false}
					disabled={disabled}
				/>
			</FormSection>
			<FormSection className="flex flex-col gap-4">
				{withCalendarShortcuts && (
					<CalendarFieldShortcuts
						onTomorrowPress={() =>
							targetDateField.onChange(timeService.lib.getEndOfTheDay(timeService.lib.getTomorrow()))
						}
						onTodayPress={() =>
							targetDateField.onChange(timeService.lib.getEndOfTheDay(timeService.lib.getCurrentTimestamp()))
						}
						onCalendarPress={() => {
							targetDateField.onChange(timeService.lib.getEndOfTheDay(timeService.lib.getDayAfterTomorrow()));
						}}
						value={targetDateField.value}
					/>
				)}
				<CalendarField
					value={targetDateField.value ? new Date(targetDateField.value) : null}
					mode="single"
					onChange={(date) => targetDateField.onChange(timeService.lib.getEndOfTheDay(date.getTime()))}
					label="Дата завершения"
					leftSlot={<CalendarField.Icon name="calendar" />}
					error={plainErrors[targetDateField.name]}
					disabled={disabled}
				/>
			</FormSection>
			<FormSection>
				<SeamlessInput
					label="Описание"
					leftSlot={<SeamlessInput.Icon name="description" />}
					value={descriptionField.value || ''}
					onChange={descriptionField.onChange}
					multiline
					error={plainErrors[descriptionField.name]}
					disabled={disabled}
				/>
			</FormSection>
			<FormSection className="flex gap-4">
				<SeamlessInput
					label="Сколько"
					value={progressDetailsCountField.value?.toString() ?? ''}
					onChange={progressDetailsCountField.onChange}
					leftSlot={<SeamlessSelect.Icon name="ruler" />}
					error={plainErrors[progressDetailsCountField.name]}
					disabled={disabled}
				/>
				<SeamlessInput
					label="Чего"
					value={progressDetailsLabelField.value ?? ''}
					onChange={progressDetailsLabelField.onChange}
					error={plainErrors[progressDetailsLabelField.name]}
					disabled={disabled}
				/>
			</FormSection>
		</div>
	);
}
