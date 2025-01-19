import { Meta } from '@storybook/react/*';
import { ReminderCard } from './component';
import { timeService } from '&shared/services/time';
import { lib } from '&entities/reminder/model';
import { ReminderRepeatRule } from '&entities/reminder/model/constants';

const meta: Meta<typeof ReminderCard> = {
	component: ReminderCard,
	title: 'entities/reminder/reminder-card'
};

export const Default = () => (
	<ReminderCard title="Reminder title" isCompleted={false} targetDateTime={new Date().getTime()} />
);

export const WithOverdue = () => (
	<ReminderCard
		title="Reminder title"
		isCompleted={false}
		targetDateTime={new Date().getTime() - timeService.lib.DAY * 2}
		overdueDetails={lib.getOverdueDetailsOnDate(
			{
				completions: [],
				targetDateTime: Date.now() - timeService.lib.DAY * 2,
				rule: ReminderRepeatRule.Never
			},
			Date.now() - timeService.lib.HOUR * 2,
			Date.now()
		)}
	/>
);

export const WithRelatedGoal = () => (
	<ReminderCard
		title="Reminder title"
		isCompleted={false}
		targetDateTime={new Date().getTime()}
		relatedGoalName="Goal name"
	/>
);

export default meta;
