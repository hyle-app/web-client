import { ICONS } from './constants';

export type IconName = keyof typeof ICONS;

export type Props = {
	name: IconName;
} & React.SVGAttributes<SVGElement>;
