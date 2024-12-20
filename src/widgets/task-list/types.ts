import { SubtaskId, TaskId } from '&entities/task';

export type Props = React.HTMLAttributes<HTMLDivElement>;

export type ToggleSubtaskParams = {
	taskId: TaskId;
	subtaskId: SubtaskId;
};
