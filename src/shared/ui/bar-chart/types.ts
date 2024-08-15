export type Props<T extends string | symbol | number> = {
	data: Record<T, number>;
	getLabel(colIdentified: T): string;
} & React.HTMLAttributes<HTMLDivElement>;
