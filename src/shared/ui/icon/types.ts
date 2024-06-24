import { ICONS } from './constants';

type IconName = keyof typeof ICONS;

export type Props = {
	name: IconName;
} & React.SVGAttributes<SVGElement>;
