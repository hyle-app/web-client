export function plural(num: number, forms: string[]): string {
	let str: string;

	switch (forms.length) {
		case 1:
			throw new Error('Not enough forms');
		case 2:
			str = (num > 1 ? forms[1] : forms[0]) ?? '';
			break;

		default:
			str = forms[getNounPluralForm(num)] ?? '';
			break;
	}

	return str.replace(/%d/g, String(num));
}

export function getNounPluralForm(num: number): number {
	if (num % 10 === 1 && num % 100 !== 11) {
		return 0;
	} else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
		return 1;
	} else {
		return 2;
	}
}
