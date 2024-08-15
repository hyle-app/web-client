export type TypographyVariant =
	| 'heading-1'
	| 'heading-2'
	| 'heading-3'
	| 'heading-4'
	| 'heading-5'
	| 'caption-1'
	| 'caption-2'
	| 'paragraph';

export type Props = {
	variant?: TypographyVariant;
} & React.HTMLAttributes<HTMLParagraphElement>;
