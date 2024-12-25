import './relations';

import { lib } from './lib';
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
	lib
};
