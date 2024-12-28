import { timeService } from '&shared/services/time';
import { InlineCalendar } from '&shared/ui/inline-calendar';
import { useUnit } from 'effector-react';

export const LeftSideCalendarWidget = ({ className }: { className?: string }) => {
	const { changeAppDateEvent, currentAppDateStart } = useUnit({
		currentAppDateStart: timeService.outputs.$currentAppDateStart,
		changeAppDateEvent: timeService.inputs.changeCurrentAppDate
	});

	return <InlineCalendar value={currentAppDateStart} onChange={changeAppDateEvent} className={className} />;
};
