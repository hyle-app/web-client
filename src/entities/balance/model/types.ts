import { BalanceCategory } from '&shared/constants';

export type Balance = Partial<Record<BalanceCategory, number>>;
