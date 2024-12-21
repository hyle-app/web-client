import { ICONS } from './constants';
import { Props } from './types';

export function Icon({ name, ...rest }: Props) {
	const IconComponent = ICONS[name];

	return <IconComponent {...rest} xmlns="http://www.w3.org/2000/svg" />;
}
