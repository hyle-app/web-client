import './relations';

import {
	DAY,
	HOUR,
	MINUTE,
	SECOND,
	WEEK,
	YEAR,
	LEAP_YEAR,
	format,
	getCurrentTimestamp,
	getDiffInTimeUnits,
	getStartOfTheDay,
	getUnitLabel,
	isInRange,
	getDayOfWeek
} from './lib';
import { inputs, outputs } from './model';
export type { TimeUnit } from './types';

/**
 *	Service responsible for handling time-related operations.
 *	Main purpose of this service is to maintain application time state.
 *	Also it contains list of constants and helper function to perform calculations with time.
 */
export const timeService = {
	inputs,
	outputs,
	lib: {
		SECOND,
		MINUTE,
		HOUR,
		DAY,
		WEEK,
		YEAR,
		LEAP_YEAR,
		getCurrentTimestamp,
		getUnitLabel,
		format,
		getStartOfTheDay,
		getDiffInTimeUnits,
		isInRange,
		getDayOfWeek
	}
};
