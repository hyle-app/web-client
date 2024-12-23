import { Reminder, ReminderFormFieldName, ReminderFormValues } from '&entities/reminder/model';
import { ReminderRepeatRule } from '&entities/reminder/model/constants';
import { CreateReminderDTO, ReminderDTO } from '../api';

export function mapFormValuesToDTO(form: ReminderFormValues): CreateReminderDTO {
	return {
		title: form[ReminderFormFieldName.Title],
		expiresAt: new Date(form[ReminderFormFieldName.TargetDate]).setMilliseconds(form[ReminderFormFieldName.TargetTime]),
		description: form[ReminderFormFieldName.Description] ?? '',
		linkedGoal: form[ReminderFormFieldName.LinkedGoalId]
			? { id: form[ReminderFormFieldName.LinkedGoalId], title: '' }
			: null,
		rule: form[ReminderFormFieldName.RepeatRule]
	};
}

export function mapDtoToReminder(dto: ReminderDTO): Reminder {
	return {
		id: dto.reminderId,
		title: dto.title,
		description: dto.description,
		linkedGoalId: dto.linkedGoal?.id?.toString() ?? null,
		createdAt: dto.createdAt,
		targetDateTime: dto.expiresAt,
		completedAt: dto.completedAt ?? null,
		completions: dto.completions ?? [],
		expirations: dto.expirations ?? [],
		rule: dto.rule as ReminderRepeatRule
	};
}
