export type ChildCardProps = {
	leftSlot?: React.ReactNode;
	titleSlot?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export type ChildrenIndentProps = {
	children: React.ReactElement[];
} & React.HTMLAttributes<HTMLDivElement>;
