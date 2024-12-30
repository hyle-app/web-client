import { cn } from '&shared/utils';
import { Typography } from '../typography';

export function ErrorMessage({
	children,
	className,
	...attributes
}: React.PropsWithChildren<React.ParamHTMLAttributes<HTMLParagraphElement>>) {
	return (
		<Typography {...attributes} className={cn('text-color-error ', className)} variant="caption-1">
			{children}
		</Typography>
	);
}
