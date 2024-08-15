import React from 'react';
import { SeamlessInput } from '&shared/ui/seamless-input';
import { SeamlessSelect } from '&shared/ui/seamless-select';
import { getReminderTimeOptions } from './constants';

const TIME_OPTIONS = getReminderTimeOptions();

export function TaskForm() {
	const [value, setValue] = React.useState<string>('some value');
	const [selectValue, setSelectValue] = React.useState<string | undefined>(undefined);

	return (
		<div className="pt-6">
			<SeamlessInput label="описание" leftSlot={<SeamlessInput.Icon name="plus" />} value={value} onChange={setValue} />
			<SeamlessSelect
				options={TIME_OPTIONS}
				value={selectValue}
				hideLeftSlotWhenHasContnent={false}
				onChange={setSelectValue}
				label="Напоминание"
				leftSlot={<SeamlessSelect.Icon name="bell" />}
			/>
		</div>
	);
}
