import { HabitDTO } from '../api';
import { HabitRepeatRule } from './constants';
import { Habit } from './types';

export function mapDtoToHabit(dto: HabitDTO): Habit {
	return {
		id: dto.habitId.toString(),
		title: dto.title ?? '',
		createdAt: dto.createdAt,
		completedAt: dto.completedAt ?? null,
		description: dto.description || null,
		linkedGoalId: dto.linkedGoal?.id && dto.linkedGoal?.id > 0 ? dto.linkedGoal.id.toString() : null,
		penalty: dto.penalty,
		repeatRule: (dto.rule as HabitRepeatRule[]) || [],
		emoji: dto.emoji || null,
		remindAt: dto.remindAt ?? null,
		currentProgress: dto.progress ?? 0,
		targetProgress: dto.progressMax,
		dailyProgressSnaphots: dto.progressedSteps ?? {},
		dailyTargetProgressDetails:
			dto.steps?.count && Number(dto.steps.count) > 0
				? { targetProgress: Number(dto.steps.count), label: dto.steps.rate || null }
				: null,
		completions: dto.completions ?? []
	};
}
