export const devLogger = {
	warn: (message: string, args: object) => {
		if (import.meta.env.DEV) {
			throw new Error(`[DEV LOGGER] ${message}. Args: ${JSON.stringify(args)}`);
		} else {
			console.warn(`[DEV LOGGER] ${message}`);
		}
	}
};
