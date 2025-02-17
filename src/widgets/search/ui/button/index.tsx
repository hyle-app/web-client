import { Icon } from '&shared/ui/icon';
import React from 'react';
import { SearchField } from '../field';
import { cn } from '&shared/utils';
import { useUnit } from 'effector-react';
import { inputs } from '../../model';

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
		<div className="relative w-fit" ref={ref}>
			<button className="w-14 h-14 flex items-center justify-center" {...attrs} onClick={() => setIsVisible(true)}>
				<Icon name="search" className="w-6 h-6" />
			</button>

			<SearchField
				inputRef={inputRef}
				className={cn(
					'absolute right-0 top-1/2 md:w-[330px] -translate-y-1/2 w-14 md:max-w-[330px] transition-all opacity100',
					{
						'md:max-w-14 pointer-events-none opacity-0': !isVisible
					}
				)}
				inputClassName={cn('transition-all', { 'px-4': !isVisible })}
				onClose={() => setIsVisible(false)}
			/>
		</div>
	);
};
