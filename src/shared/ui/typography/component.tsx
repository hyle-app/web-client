import { cn } from '&shared/utils';
import { VARIANT_CLASSES } from './constants';
import { Props } from './types';

export function Typography({ variant = 'paragraph', children, className, ...attributes }: Props) {
	return (
		<p className={cn(VARIANT_CLASSES[variant], className)} {...attributes}>
			{children}
		</p>
	);
}
