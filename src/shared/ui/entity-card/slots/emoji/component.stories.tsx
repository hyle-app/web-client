import { Meta } from '@storybook/react/*';
import { EntityCardEmoji } from './component';

const meta: Meta<typeof EntityCardEmoji> = {
	component: EntityCardEmoji,
	title: 'shared/entity-card/slots/emoji'
};

export function Default() {
	return <EntityCardEmoji code="1f600" />;
}

export function Colorful() {
	return <EntityCardEmoji code="1f4a7" />;
}

export default meta;
