export function emojiToUnicode(emoji: string): string {
	return emoji
		.split('‍')
		.map((str) => str.codePointAt(0)?.toString(16))
		.join('-');
}

export function unicodeToEmoji(unicode: string): string {
	if (!unicode) return '';

	if (unicode.includes('-')) {
		return unicode.split('-').map(unicodeToEmoji).join('‍');
	}

	const emoji = Number('0x' + unicode);

	return Number.isFinite(emoji) ? String.fromCodePoint(emoji) : unicode;
}
