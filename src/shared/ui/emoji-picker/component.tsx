import EmojiPicker, { Categories } from 'emoji-picker-react';
import { Props } from './types';
import React from 'react';
import { Icon } from '../icon';
import { emojiToUnicode, unicodeToEmoji } from '&shared/utils';

const CATEGORIES = [
	{ category: Categories.SMILEYS_PEOPLE, name: 'Люди' },
	{ category: Categories.ANIMALS_NATURE, name: 'Животные' },
	{ category: Categories.FOOD_DRINK, name: 'Еда и напитки' },
	{ category: Categories.TRAVEL_PLACES, name: 'Путешествия и места' },
	{ category: Categories.ACTIVITIES, name: 'Активности' },
	{ category: Categories.OBJECTS, name: 'Объекты' },
	{ category: Categories.SYMBOLS, name: 'Символы' },
	{ category: Categories.FLAGS, name: 'Флаги' }
];

export function EmojiPickerField({ value, onChange }: Props) {
	const [isOpen, setIsOpen] = React.useState(false);

	const rootElementRef = React.useRef<HTMLButtonElement>(null);

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

	React.useEffect(() => {
		if (isOpen) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}

		return () => {
			window.removeEventListener('click', handleOutsideClick);
		};
	}, [isOpen]);

	return (
		<button className="w-8 h-8 relative" ref={rootElementRef} onClick={() => setIsOpen((isOpen) => !isOpen)}>
			<div className="w-8 h-8 flex justify-centery items-center relative">
				{value ? unicodeToEmoji(value) : <Icon name="smiley" />}
			</div>

			{isOpen && (
				<EmojiPicker
					className="w-full max-w-[600px] absolute z-50"
					onEmojiClick={(emojiData) => {
						onChange(emojiToUnicode(emojiData.emoji));
						setIsOpen(false);
					}}
					categories={CATEGORIES}
				/>
			)}
		</button>
	);
}
