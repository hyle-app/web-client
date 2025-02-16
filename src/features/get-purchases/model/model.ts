import { createEffect, createEvent, createStore } from 'effector';
import { getPurchases } from '../api';
import { Purchase } from '../api/types';

const getAllPurchases = createEvent<string>();

const getPurchasesFx = createEffect(getPurchases);

const $purchases = createStore<Purchase[]>([]);

export const outputs = { $purchases };
export const inputs = { getAllPurchases };
export const internals = { getPurchasesFx };
