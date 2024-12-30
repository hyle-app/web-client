import React from 'react';

import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { FormSection } from '&shared/ui/form-section';
import { cn, getPlainErrors, unicodeToEmoji } from '&shared/utils';

import { getReminderTimeOptions } from './constants';
import { Props } from './types';
import { EntityCard } from '&shared/ui/entity-card';
import { Typography } from '&shared/ui/typography';
import { useController, useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { HabitFormFieldName, HabitFormValues } from '&entities/habit';
import { SquareCheckbox } from '&shared/ui/square-checkbox';
import { HabitRepeatRule } from '&entities/habit/model/constants';
import { EmojiPickerField } from '&shared/ui/emoji-picker';
import { ErrorMessage } from '&shared/ui/error-message';

const TIME_OPTIONS = getReminderTimeOptions();

const REPEAT_RULE_OPTIONS = Object.values(HabitRepeatRule).map((value) => ({
	value,
	label: {
		[HabitRepeatRule.Sunday]: 'Вс',
		[HabitRepeatRule.Monday]: 'Пн',
		[HabitRepeatRule.Tuesday]: 'Вт',
		[HabitRepeatRule.Wednesday]: 'Ср',
		[HabitRepeatRule.Thursday]: 'Чт',
		[HabitRepeatRule.Friday]: 'Пт',
		[HabitRepeatRule.Saturday]: 'Сб'
	}[value]
}));

export function HabitForm({ goalsToLinkTo }: Props) {
	const {
		control,
		formState: { errors }
	} = useFormContext<HabitFormValues>();

	const { field: titleField } = useController({
		control,
		name: HabitFormFieldName.Title
	});
	const { field: descriptionField } = useController({
		control,
		name: HabitFormFieldName.Description
	});
	const { field: emojiField } = useController({
		control,
		name: HabitFormFieldName.Emoji
	});
	const {
		append: appendRepeatRule,
		remove: removeRepeatRule,
		replace: setRepeatRuleSet
	} = useFieldArray({
		control,
		name: HabitFormFieldName.RepeatRule
	});
	const { field: reminderTimeField } = useController({
		control,
		name: HabitFormFieldName.ReminderTime
	});
	const { field: linkedGoalIdField } = useController({
		control,
		name: HabitFormFieldName.LinkedGoalId
	});

	const { field: penaltyField } = useController({
		control,
		name: HabitFormFieldName.Penalty
	});

	const { field: totalRepeatCountField } = useController({
		control,
		name: HabitFormFieldName.TotalRepeatCount
	});

	const { field: dailyTargetProgressField } = useController({
		control,
		name: HabitFormFieldName.DailyTargetProgress
	});
	const { field: dailyTargetProgressLabelField } = useController({
		control,
		name: HabitFormFieldName.DailyTargetProgressLabel
	});

	const activeRepeatRules = useWatch({ name: HabitFormFieldName.RepeatRule, control });

	const plainErrors = React.useMemo(() => getPlainErrors(errors), [errors]);

	const goalsOptions = React.useMemo(
		() => goalsToLinkTo.map((goal) => ({ value: goal.id, label: goal.title, icon: goal.emoji })),
		[goalsToLinkTo]
	);

	const isRepeatEveryDayActive = activeRepeatRules.length === 7;
	const toggleRepeatEveryDay = React.useCallback(() => {
		if (isRepeatEveryDayActive) {
			setRepeatRuleSet([]);
			return;
		}

		setRepeatRuleSet(REPEAT_RULE_OPTIONS.map((option) => option.value));
	}, [isRepeatEveryDayActive, appendRepeatRule, removeRepeatRule, activeRepeatRules]);
	const toggleRepeatRule = React.useCallback(
		(value: HabitRepeatRule) => {
			if (activeRepeatRules.includes(value)) {
				removeRepeatRule(activeRepeatRules.indexOf(value));
				return;
			}

			appendRepeatRule(value);
		},
		[appendRepeatRule, removeRepeatRule, activeRepeatRules]
	);

	return (
		<div className="">
			<FormSection className="flex gap-2 items-center">
				<EmojiPickerField value={emojiField.value ?? undefined} onChange={emojiField.onChange} />
				<SeamlessInput
					label="Название привычки"
					value={titleField.value}
					onChange={titleField.onChange}
					persistantLabel={false}
					inputClassName="text-heading-3 h-full"
					labelClassName="!text-heading-3 font-light"
					className="h-[39px] py-0"
					error={plainErrors[titleField.name]}
				/>
			</FormSection>
			<FormSection className="flex gap-4">
				<SeamlessInput
					label="Повторений"
					value={totalRepeatCountField.value}
					onChange={totalRepeatCountField.onChange}
					leftSlot={<SeamlessSelect.Icon name="refresh" />}
					error={plainErrors[totalRepeatCountField.name]}
				/>
				<SeamlessInput
					label="Штраф"
					value={penaltyField.value?.toString() ?? ''}
					onChange={penaltyField.onChange}
					error={plainErrors[penaltyField.name]}
				/>
			</FormSection>
			<FormSection className="flex flex-col gap-4">
				<label className="flex gap-4">
					<SquareCheckbox checked={isRepeatEveryDayActive} onClick={toggleRepeatEveryDay} />
					<Typography>Повторять каждый день</Typography>
				</label>
				<div className="flex gap-2 relative">
					{REPEAT_RULE_OPTIONS.map((option) => (
						<button
							key={option.value}
							className={cn('bg-color-bg-100 p-4 rounded-[15px] transition-colors', {
								'text-color-error':
									option.value === HabitRepeatRule.Sunday || option.value === HabitRepeatRule.Saturday,
								'bg-color-brand-primary-50 text-color-white': activeRepeatRules.includes(option.value)
							})}
							onClick={() => toggleRepeatRule(option.value)}
						>
							{option.label}
						</button>
					))}
					{plainErrors[HabitFormFieldName.RepeatRule] && (
						<ErrorMessage className="absolute -bottom-1 translate-y-full">
							{plainErrors[HabitFormFieldName.RepeatRule]}
						</ErrorMessage>
					)}
				</div>
			</FormSection>
			<FormSection>
				<SeamlessSelect<string>
					options={TIME_OPTIONS}
					value={reminderTimeField.value?.toString() ?? undefined}
					onChange={(value) =>
						value === undefined ? reminderTimeField.onChange(value) : reminderTimeField.onChange(parseInt(value))
					}
					label="Напомнить"
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
					error={plainErrors[descriptionField.name]}
				/>
			</FormSection>

			<FormSection className="flex gap-4">
				<SeamlessInput
					label="Сколько"
					value={dailyTargetProgressField.value?.toString() ?? ''}
					onChange={dailyTargetProgressField.onChange}
					leftSlot={<SeamlessSelect.Icon name="ruler" />}
					error={plainErrors[dailyTargetProgressField.name]}
				/>
				<SeamlessInput
					label="Чего"
					value={dailyTargetProgressLabelField.value ?? ''}
					onChange={dailyTargetProgressLabelField.onChange}
					error={plainErrors[dailyTargetProgressLabelField.name]}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					label="Прикрепить цель"
					leftSlot={<SeamlessSelect.Icon name="goal" />}
					className="w-full"
					inputClassName="md:max-w-full w-full"
					contentWrapperClassName="md:max-w-[calc(590px-88px)]"
					hideLeftSlotWhenHasContnent
					value={linkedGoalIdField.value ?? ''}
					options={goalsOptions}
					onChange={(goalId) => linkedGoalIdField.onChange(goalId || null)}
					error={plainErrors[linkedGoalIdField.name]}
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

HabitForm.FieldName = HabitFormFieldName;