import { cn } from '&shared/utils';
import { Props } from './types';

export function FormSection({ children, className, ...attributes }: React.PropsWithChildren<Props>) {
	return (
		<div className={cn('px-8 py-6 border-b border-b-color-gray-10', className)} {...attributes} contentEditable={false}>
			{children}
		</div>
	);
}
