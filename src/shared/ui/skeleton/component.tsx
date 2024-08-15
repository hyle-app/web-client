import { cn } from '&shared/utils';
import { Props } from './types';

export function Skeleton({ className, ...attributes }: Props) {
	return <div className={cn('bg-color-gray-10', className)} {...attributes}></div>;
}
