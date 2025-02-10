import { createEffect, createEvent, createStore } from 'effector';
import { getSubsription } from '../api';
import { Subscription } from '../api/types';

const getUserSubscription = createEvent<string>();

const getUserSubscriptionFx = createEffect(getSubsription);

const $subscription = createStore<Subscription | null>(null);

export const outputs = { $subscription };
export const inputs = { getUserSubscription };
export const internals = { getUserSubscriptionFx };
