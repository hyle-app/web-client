export type Variant = 'button' | 'text' | 'icon' | 'narrow-button';
export type Appearance = 'primary' | 'secondary' | 'ghost' | 'error';

export type Props = {
	variant?: Variant;
	appearance: Appearance;
	iconSlot?: React.ReactNode;
	disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;
