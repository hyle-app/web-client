import { goalEntity } from '&entities/goal';
import { cn } from '&shared/utils';
import { AchievementsListWidget } from '&widgets/achievements-list';
import { GoalListWidget } from '&widgets/goal-list';
import { OverdueGoalListWidget } from '&widgets/overdue-goals-list';
import { useUnit } from 'effector-react';

export function GoalsPage() {
	const { achievements, overdueGoals } = useUnit({
		achievements: goalEntity.outputs.$achievements,
		overdueGoals: goalEntity.outputs.$overdueGoals
	});

	const count = 1 + (overdueGoals.length > 0 ? 1 : 0) + (achievements.length ? 1 : 0);

	const layoutClasssNames: Record<number, string> = {
		1: 'md:grid-cols-[repeat(1,minmax(420px,460px))]',
		2: 'md:grid-cols-[repeat(2,minmax(420px,460px))]',
		3: 'md:grid-cols-[repeat(3,minmax(420px,1fr))]'
	};

	return (
		<div className="h-full w-0 grow">
			<div
				className={cn(
					'no-scrollbar grid h-full w-full grid-cols-[repeat(auto-fit,minmax(375px,460px))] gap-3 overflow-x-scroll px-8',
					layoutClasssNames[count] ?? layoutClasssNames[3]
				)}
			>
				<GoalListWidget className="h-full max-h-[calc(100vh-104px)]" />
				<AchievementsListWidget className="h-full max-h-[calc(100vh-104px)]" />
				<OverdueGoalListWidget className="h-full max-h-[calc(100vh-104px)]" />
			</div>
		</div>
	);
}
