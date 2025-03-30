import { GoalId, LinkedEntities } from '&entities/goal';

export type DecomposeImplementationProps = {
	className?: string;
	onApplyEntities(entities: LinkedEntities): void;
	value: LinkedEntities;
	onClose(): void;
	isOpen: boolean;
};

export type DecomposePreviewImplementationProps = {
	onDetachEntity(entityId: string, type: 'task' | 'reminder' | 'habit'): void;
	className?: string;
	linkedEntities: LinkedEntities;
	onEditClick(): void;
	interactive?: boolean;
};

export type Props = {
	isOpen: boolean;
	onClose: () => void;
	goalId: GoalId;
	disabled?: boolean;
	onFillComplexGoalProgress?: (delta: number) => void;
	onCompleteSimpleGoal?: () => void;
	DecomposeImplementation: React.FC<DecomposeImplementationProps>;
	DecomposePreviewImplementation: React.FC<DecomposePreviewImplementationProps>;
};
