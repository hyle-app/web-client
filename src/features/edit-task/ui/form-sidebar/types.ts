import { TaskId } from '&entities/task';

export type Props = {
	isOpen: boolean;
	onClose: () => void;
	taskId: TaskId;
};
