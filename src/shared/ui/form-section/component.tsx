import { cn } from '&shared/utils';
import { Props } from './types';

export function FormSection({ children, className, ...attributes }: React.PropsWithChildren<Props>) {
	return (
		<div
			className={cn('border-b border-b-color-gray-10 px-8 py-6 transition-colors', className)}
			{...attributes}
			contentEditable={false}
		>
			{children}
		</div>
	);
}
