import { FieldErrors } from 'react-hook-form';

export function getPlainErrors<T extends Record<string, unknown>>(errors?: FieldErrors<T>): Record<keyof T, string> {
	return Object.entries(errors || {}).reduce<Record<keyof T, string>>(
		(acc, [key, error]) => {
			if (typeof error?.message === 'string') {
				acc[key as keyof T] = error.message;
			}

			if (Array.isArray(error)) {
				error.forEach((errorSet, index) => {
					const errors = getPlainErrors(errorSet);
					Object.entries(errors).forEach(([innerKey, value]) => {
						acc[`${key}.${index}.${innerKey}` as keyof T] = value;
					});
				});
			}

			if (typeof error === 'object' && Object.values(error)?.at(0)?.message) {
				acc[key as keyof T] = Object.values(error).at(0).message;
			}

			return acc;
		},
		{} as Record<keyof T, string>
	);
}
