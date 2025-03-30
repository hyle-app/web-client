import { LinkedEntities } from '&entities/goal';

export type Props = {
	className?: string;
	linkedEntities: LinkedEntities;
	onEditClick(): void;
	interactive?: boolean;
	onDetachEntity(entityId: string, type: 'task' | 'reminder' | 'habit'): void;
};
