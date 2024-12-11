import { cn } from '&shared/utils';
import { CloseIcon } from './CloseIcon';
import { SuccessIcon } from './SuccessIcon';

const icons = {
	success: <SuccessIcon />,
	error: 'exclamation-circle-solid',
	warning: 'exclamation-triangle-solid',
	info: 'info-circle-solid'
};

const toastTypesClassNames = {
	success: 'border-color-success',
	error: 'border-color-error',
	warning: 'border-color-warning',
	info: 'border-color-brand-primary-50'
};
type Props = {
	type: keyof typeof toastTypesClassNames;
	title: React.ReactNode;
	description?: React.ReactNode;
	onClose?: () => void;
};

export const Toast = ({ type, title, description, onClose }: Props) => {
	return (
		<div className={cn('flex border p-4 flex-row items-start justify-between', toastTypesClassNames[type])}>
			<div className="flex flex-row items-center w-full">
				<div className="flex flex-col justify-center items-center w-6 h-6 p-1">{icons[type]}</div>
			</div>

			<div>
				<button
					className="flex items-center justify-center w-6 h-6 bg-transparent border border-red-800"
					onClick={onClose}
				>
					<CloseIcon />
				</button>
			</div>
		</div>
	);
};
