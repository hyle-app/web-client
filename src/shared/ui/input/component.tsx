import { Props } from './types';

export function Input({ leftSlot, ...props }: Props) {
	return (
		<label>
			{leftSlot ?? null}
			<input {...props} />
		</label>
	);
}
