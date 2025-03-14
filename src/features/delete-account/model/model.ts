import { createEffect, createEvent } from 'effector';
import { deleteAccountApi } from '../api';

const deleteAccount = createEvent();

const deleteAccountFx = createEffect(deleteAccountApi.deleteAccount);

export const inputs = { deleteAccount };

export const internals = { deleteAccountFx };
