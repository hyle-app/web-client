import React from 'react';

import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { FormSection } from '&shared/ui/form-section';
import { unicodeToEmoji } from '&shared/utils';

import { getReminderRepeatOptions, getReminderTimeOptions } from './constants';
import { Props } from './types';
import { EntityCard } from '&shared/ui/entity-card';
import { Typography } from '&shared/ui/typography';
import { CalendarField } from '&shared/ui/calendar-field/component';

const TIME_OPTIONS = getReminderTimeOptions();
const REPEAT_OPTIONS = getReminderRepeatOptions();

export function ReminderForm({ goalsToLinkTo }: Props) {
	const [title, setTitle] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');
	const [selectValue, setSelectValue] = React.useState<string | undefined>(undefined);
	const [repeatOption, setRepeatOption] = React.useState<string | undefined>(undefined);
	const [selectedGoalId, setSelectedGoalId] = React.useState<null | string>(null);
	const [date, setDate] = React.useState<Date | null>(null);

	const goalsOptions = React.useMemo(
		() => goalsToLinkTo.map((goal) => ({ value: goal.id, label: goal.title, icon: goal.emoji })),
		[goalsToLinkTo]
	);

	return (
		<div className="">
			<FormSection>
				<SeamlessInput
					label="Название напоминания"
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
					mode="single"
					onChange={setDate}
					label="Когда напомнить"
					leftSlot={<CalendarField.Icon name="calendar" />}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					options={TIME_OPTIONS}
					value={selectValue}
					hideLeftSlotWhenHasContnent={false}
					onChange={setSelectValue}
					label="Время напоминания"
					leftSlot={<SeamlessSelect.Icon name="watch" />}
				/>
			</FormSection>
			<FormSection>
				<SeamlessSelect
					options={REPEAT_OPTIONS}
					value={repeatOption}
					hideLeftSlotWhenHasContnent={false}
					onChange={setRepeatOption}
					label="Повторять"
					leftSlot={<SeamlessSelect.Icon name="refresh" />}
				/>
			</FormSection>
			<FormSection>
				<SeamlessInput
					label="Описание"
					leftSlot={<SeamlessInput.Icon name="plus" />}
					value={value}
					onChange={setValue}
					multiline
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
