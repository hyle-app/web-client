import { cn } from '&shared/utils';
import { noop } from '&shared/utils/noop';
import { Icon } from '../icon';
import { Props } from './types';

export function SquareCheckbox({ className, ...attributes }: Props) {
	const isChecked = attributes.checked ?? attributes.value;
	return (
		<label
			className={cn(
				'transition-colors border border-[2px] w-[24px] h-[24px] rounded-[7px] flex items-center justify-center',
				{
					'bg-color-brand-primary-50 border-color-brand-primary-50': isChecked,
					'bg-transparent border-color-gray-50': !isChecked
				},
				className
			)}
		>
			{isChecked && <Icon name="tick" className="text-white w-[8.8px] h-[6px]" />}
			<input type="checkbox" onChange={attributes.onChange ?? noop} {...attributes} className="w-0 h-0 invisible" />
		</label>
	);
}
