import { cn } from '&shared/utils';
import { useUnit } from 'effector-react';
import { Search } from 'lucide-react';
import React from 'react';
import { inputs } from '../../model';
import { SearchField } from '../field';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SearchButtonWidget = ({ ...attrs }: Props) => {
	const [isVisible, setIsVisible] = React.useState(false);

	const { clearQueryEvent } = useUnit({
		clearQueryEvent: inputs.resetQuery
	});

	const ref = React.useRef<HTMLDivElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const controller = new AbortController();
		if (isVisible) {
			inputRef.current?.focus();
			window.addEventListener(
				'click',
				(event) => {
					if (!ref.current?.contains(event.target as Node)) {
						setIsVisible(false);
						clearQueryEvent();
					}
				},
				{ signal: controller.signal }
			);
			return () => controller.abort();
		}

		controller.abort();
		return () => controller.abort();
	}, [isVisible]);

	return (
		<div className="relative z-10 w-fit" ref={ref}>
			<button className="flex h-14 w-14 items-center justify-center" {...attrs} onClick={() => setIsVisible(true)}>
				<Search size={24} className="text-color-text-and-icon-80" />
			</button>

			<SearchField
				inputRef={inputRef}
				className={cn(
					'opacity100 absolute right-0 top-1/2 w-14 -translate-y-1/2 transition-all md:w-[330px] md:max-w-[330px]',
					{
						'pointer-events-none opacity-0 md:max-w-14': !isVisible
					}
				)}
				inputClassName={cn('transition-all', { 'px-4': !isVisible })}
				onClose={() => setIsVisible(false)}
			/>
		</div>
	);
};
