import { Meta } from '@storybook/react/*';
import { EntityCardCircularProgressBar } from './component';

const meta: Meta<typeof EntityCardCircularProgressBar> = {
	component: EntityCardCircularProgressBar,
	title: 'shared/entity-card/slots/circular-progress-bar'
};

export function Null() {
	return <EntityCardCircularProgressBar progressValue={0} />;
}

export function Quarter() {
	return <EntityCardCircularProgressBar progressValue={0.25} />;
}

export function Half() {
	return <EntityCardCircularProgressBar progressValue={0.5} />;
}

export function ThreeQuarterHalf() {
	return <EntityCardCircularProgressBar progressValue={0.75} />;
}

export function Full() {
	return <EntityCardCircularProgressBar progressValue={1} />;
}

export default meta;
