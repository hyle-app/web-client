import { HabitId } from '&entities/habit';

export type Props = {
	isOpen: boolean;
	onClose: () => void;
	onCompleteSimpleHabit: () => void;
	onFillComplexHabitDayProgress: (delta: number) => void;
	habitId: HabitId;
};
