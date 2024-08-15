export type Variant = 'button' | 'text' | 'icon';
export type Appearance = 'primary' | 'secondary' | 'ghost';

export type Props = {
	variant?: Variant;
	appearance: Appearance;
	iconSlot?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;
