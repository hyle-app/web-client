import { formatDistanceStrict } from 'date-fns';
import { ru } from 'date-fns/locale';

export const makeReadableStatus = (status: string | null): string => {
	if (!status) return '';
	switch (status) {
		case 'ERROR':
			return 'Ошибка';
		case 'PENDING':
			return 'Не оплачен';
		case 'SUCCESS':
			return 'Успешно';
		default:
			return status;
	}
};

export const makeReadableDate = (date: string | null): string => {
	if (!date) return '';
	const dateObj = new Date(parseInt(date));
	return dateObj.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
};

export const makeReadableSubscriptionKind = (kind: string | null): string => {
	if (!kind) return '';
	switch (kind) {
		case 'ONE_MONTH':
			return 'Один месяц';
		case 'THREE_MONTH':
			return 'Три месяца';
		case 'ONE_YEAR':
			return 'Один год';
		case 'FOREVER':
			return 'Навсегда';
		default:
			return kind;
	}
};

export const makeReadableSubscriptionTier = (tier: string): string => {
	if (!tier) return '';
	switch (tier) {
		case 'pro':
			return 'Hyle Pro';
		case 'free':
			return 'Hyle Free';
		default:
			return tier;
	}
};

export const makeReadableSubscriptionExpiration = (expiration: number[]): string => {
	const year = expiration[0] as number;
	const month = expiration[1] as number;
	const day = expiration[2] as number;

	if (!expiration) return '';
	const dateObj = new Date(year, month, day);
	return dateObj.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
};

export const getTimeRemaining = (expiration: number[]): string => {
	const year = expiration[0] as number;
	const month = expiration[1] as number;
	const day = expiration[2] as number;
	const expirationDate = new Date(year, month, day);
	return formatDistanceStrict(expirationDate, new Date(), {
		locale: ru
	});
};
