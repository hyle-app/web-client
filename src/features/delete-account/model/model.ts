import { createEffect, createEvent } from 'effector';
import { deleteAccountApi } from '../api';

const deleteAccount = createEvent<string>();

const deleteAccountFx = createEffect(deleteAccountApi.deleteAccount);

export const inputs = { deleteAccount };

export const internals = { deleteAccountFx };
