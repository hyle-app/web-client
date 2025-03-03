import { emojiToUnicode, unicodeToEmoji } from '&shared/utils';
import EmojiPicker, { Categories } from 'emoji-picker-react';
import type { CategoriesConfig } from 'emoji-picker-react/dist/config/categoryConfig';
import { Smile } from 'lucide-react';
import React from 'react';
import { Props } from './types';

const CATEGORIES: CategoriesConfig = [
	{ category: Categories.SMILEYS_PEOPLE, name: 'Люди' },
	{ category: Categories.ANIMALS_NATURE, name: 'Животные' },
	{ category: Categories.FOOD_DRINK, name: 'Еда и напитки' },
	{ category: Categories.TRAVEL_PLACES, name: 'Путешествия и места' },
	{ category: Categories.ACTIVITIES, name: 'Активности' },
	{ category: Categories.OBJECTS, name: 'Объекты' },
	{ category: Categories.SYMBOLS, name: 'Символы' },
	{ category: Categories.FLAGS, name: 'Флаги' }
];

export function EmojiPickerField({ value, onChange, disabled }: Props) {
	const [isOpen, setIsOpen] = React.useState(false);

	const rootElementRef = React.useRef<HTMLDivElement>(null);
	const inputElementRef = React.useRef<HTMLInputElement | null>();

	const handleOutsideClick = React.useCallback((event: MouseEvent) => {
		const target = event.target as HTMLElement;
		const rootElement = rootElementRef.current;

		if (!rootElement) return;
		if (rootElement.contains(target)) return;
		const emojiPickerRoot = rootElement.querySelector('.EmojiPickerReact');
		if (!emojiPickerRoot) return;

		if (emojiPickerRoot.contains(target)) return;
		setIsOpen(false);
	}, []);

	const handleKeyboardPress = React.useCallback(
		(event: KeyboardEvent) => {
			// Prevent closing the picker when user is focused on input
			if (document.activeElement?.tagName === 'INPUT') {
				return;
			}

			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		},
		[setIsOpen]
	);

	React.useEffect(() => {
		if (isOpen) {
			window.addEventListener('click', handleOutsideClick);
			window.addEventListener('keydown', handleKeyboardPress);
		} else {
			window.removeEventListener('click', handleOutsideClick);
			window.removeEventListener('keydown', handleKeyboardPress);
		}

		return () => {
			window.removeEventListener('click', handleOutsideClick);
			window.removeEventListener('keydown', handleKeyboardPress);
		};
	}, [isOpen]);

	React.useLayoutEffect(() => {
		if (isOpen) {
			inputElementRef.current = rootElementRef.current?.querySelector('input[aria-controls="epr-search-id"]') ?? null;
		}
	}, [isOpen]);

	return (
		<div className="relative h-8 w-8" ref={rootElementRef}>
			<button onClick={() => !disabled && setIsOpen((isOpen) => !isOpen)} className="h-8 w-8">
				<p className="relative flex h-8 w-8 items-center justify-center text-[26px]">
					{value ? unicodeToEmoji(value) : <Smile size={24} className="text-color-text-and-icon-80" />}
				</p>
			</button>

			<EmojiPicker
				className="absolute z-50 w-full max-w-[600px]"
				previewConfig={{ showPreview: false }}
				onEmojiClick={(emojiData) => {
					onChange(emojiToUnicode(emojiData.emoji));
					setIsOpen(false);
				}}
				open={isOpen}
				autoFocusSearch={false}
				lazyLoadEmojis
				categories={CATEGORIES}
			/>
		</div>
	);
}
