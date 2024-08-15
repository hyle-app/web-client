import { timeService } from '&shared/services/time';
import { SeamlessSelect } from '&shared/ui/seamless-select';

export function getReminderTimeOptions(): React.ComponentProps<typeof SeamlessSelect>['options'] {
	const hours = Array.from({ length: 24 }, (_, i) => i);
	const minutes = Array.from({ length: 2 }, (_, i) => i * 30);

	return hours.flatMap((hour) =>
		minutes.map((minute) => ({
			value: String(hour * timeService.lib.HOUR + minute * timeService.lib.MINUTE),
			label: `${hour}:${minute.toString().padStart(2, '0')}`,
			key: String(hour * timeService.lib.HOUR + minute * timeService.lib.MINUTE)
		}))
	);
}
