import { cn } from '&shared/utils';
import { noop } from '&shared/utils/noop';
import { Icon } from '../icon';
import { Props } from './types';

export function Checkbox({ className, ...attributes }: Props) {
	const isChecked = attributes.checked ?? attributes.value;
	return (
		<label
			className={cn(
				'flex h-[18px] w-[18px] cursor-pointer items-center justify-center rounded-full border border-[1px] transition-colors',
				{
					'border-color-brand-primary-50 bg-color-brand-primary-50': isChecked,
					'border-color-gray-50 bg-transparent': !isChecked
				},
				className
			)}
		>
			{isChecked && <Icon name="tick" className="h-[6px] w-[8.8px] text-white" />}
			<input type="checkbox" onChange={attributes.onChange ?? noop} {...attributes} className="invisible h-0 w-0" />
		</label>
	);
}
