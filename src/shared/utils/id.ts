export function generateTemporaryId(length: number = 32): string {
	return Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

let id: number = 0;
export function generateSequentialId(): string {
	return `${id++}`;
}
