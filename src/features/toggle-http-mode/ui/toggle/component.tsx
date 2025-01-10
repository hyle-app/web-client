import { useUnit } from 'effector-react';
import { Props } from './types';
import { HttpConfigKind, httpService } from '&shared/services/http';
import { Typography } from '&shared/ui/typography';
import { Switch } from '&shared/ui/switch';
import { cn } from '&shared/utils';

export function HttpModeToggle({ className }: Props) {
	const { activeKind, toggleEvent } = useUnit({
		activeKind: httpService.outputs.$httpConfigKind,
		toggleEvent: httpService.inputs.toggleHttpConfig
	});

	return (
		<div
			className={cn('flex items-center gap-2', className)}
			onClick={(event) => {
				event.stopPropagation();
				event.preventDefault();
				toggleEvent();
			}}
		>
			<Switch checked={HttpConfigKind.Dev === activeKind} />
			<Typography>Current mode: {activeKind}</Typography>
		</div>
	);
}
