import { Sidebar } from '&shared/ui/sidebar';
import { Typography } from '&shared/ui/typography';
import { Props } from './types';

export const DecomposeGoalSidebar = ({ onApplyEntities, isOpen, onClose }: Props) => {
	return (
		<Sidebar isOpen={isOpen} onClose={onClose}>
			<Typography>Decompose Goal</Typography>
		</Sidebar>
	);
};
