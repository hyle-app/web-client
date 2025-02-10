import { createEffect, createEvent } from 'effector';
import { getWebpayUrl } from '../api';
import { getPaymentUrlParams } from '../api/types';

const getPaymentUrl = createEvent<getPaymentUrlParams>();

const getPaymentUrlFx = createEffect(getWebpayUrl);

export const inputs = { getPaymentUrl };
export const internals = { getPaymentUrlFx };
