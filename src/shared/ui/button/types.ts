export type Variant = 'button' | 'text' | 'icon' | 'narrow-button';
export type Appearance = 'primary' | 'secondary' | 'ghost' | 'error' | 'primary-outline';

export type CommonProps = {
	variant?: Variant;
	appearance: Appearance;
	iconSlot?: React.ReactNode;
	disabled?: boolean;
};

export type Props = CommonProps &
	(
		| ({ tag?: 'button' | never } & React.ButtonHTMLAttributes<HTMLButtonElement>)
		| ({ tag: 'a' } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
	);
