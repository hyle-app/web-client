import { GoalId } from '&entities/goal/model/types';

export type Props = {
	isOpen: boolean;
	onClose: () => void;
	goalId: GoalId;
	disabled?: boolean;
	onFillComplexGoalProgress?: (delta: number) => void;
	onCompleteSimpleGoal?: () => void;
};
