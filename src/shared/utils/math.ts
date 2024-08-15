export function clamp(min: number, max: number, value: number): number {
	if (value < min) {
		return min;
	}

	if (value > max) {
		return max;
	}

	return value;
}

export function map(value: number, min: number, max: number, newMin: number, newMax: number): number {
	return newMin + (value / (max - min)) * (newMax - newMin);
}
