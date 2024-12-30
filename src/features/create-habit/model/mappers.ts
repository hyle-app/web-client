import { Habit, HabitFormFieldName, HabitFormValues } from '&entities/habit';
import { HabitRepeatRule } from '&entities/habit/model/constants';
import { CreateHabitResponse, HabitDTO } from '../api';

export function mapFormValuesToDTO(formValues: HabitFormValues): HabitDTO {
	return {
		title: formValues[HabitFormFieldName.Title],
		completedAt: null,
		description: formValues[HabitFormFieldName.Description] ?? undefined,
		linkedGoal: formValues[HabitFormFieldName.LinkedGoalId]
			? { id: formValues[HabitFormFieldName.LinkedGoalId], title: '' }
			: null,
		progressMax: formValues[HabitFormFieldName.TotalRepeatCount],
		penalty: formValues[HabitFormFieldName.Penalty] ?? 1,
		rule: formValues[HabitFormFieldName.RepeatRule],
		emoji: formValues[HabitFormFieldName.Emoji] ?? '',
		remindAt: undefined,
		steps: {
			count: formValues[HabitFormFieldName.DailyTargetProgress]?.toString() ?? undefined,
			rate: formValues[HabitFormFieldName.DailyTargetProgressLabel] ?? undefined
		}
	};
}

export function mapDtoToHabit(dto: CreateHabitResponse): Habit {
	return {
		id: dto.habitId.toString(),
		title: dto.title ?? '',
		createdAt: dto.createdAt,
		completedAt: dto.completedAt ?? null,
		description: dto.description,
		linkedGoalId: dto.linkedGoal?.id ?? null,
		penalty: dto.penalty,
		repeatRule: (dto.rule as HabitRepeatRule[]) ?? [],
		emoji: dto.emoji,
		remindAt: dto.remindAt ?? null,
		currentProgress: dto.progress,
		targetProgress: dto.progressMax,
		dailyProgressSnaphots: dto.progressedSteps,
		dailyTargetProgressDetails:
			dto.steps?.count && parseInt(dto.steps.count) > 1
				? { targetProgress: parseInt(dto.steps.count), label: dto.steps.rate ?? null }
				: null,
		completions: dto.completions ?? []
	};
}
