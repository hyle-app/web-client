import { ICONS } from './constants';
import { Props } from './types';

export function Icon({ name, ...rest }: Props) {
	const IconComponent = ICONS[name];

	return <IconComponent {...rest} />;
}
