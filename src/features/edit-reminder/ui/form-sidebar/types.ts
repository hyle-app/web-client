import { ReminderId } from '&entities/reminder';

export type Props = {
	isOpen: boolean;
	onClose: () => void;
	reminderId: ReminderId;
};
