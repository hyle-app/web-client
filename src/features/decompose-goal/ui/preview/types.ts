import { LinkedEntities } from '&entities/goal';

export type Props = {
	className?: string;
	linkedEntities: LinkedEntities;
	onEditClick(): void;
};
