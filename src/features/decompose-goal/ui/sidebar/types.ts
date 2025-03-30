import { LinkedEntities } from '&entities/goal';

export type Props = {
	onApplyEntities(entities: LinkedEntities): void;
	value: LinkedEntities;
	className?: string;
	onClose(): void;
	isOpen: boolean;
	interactive?: boolean;
};
