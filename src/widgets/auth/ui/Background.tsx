import { LeftBar } from './LeftBar';
import { RightArea } from './RightArea';

export const Background = () => {
	return (
		<div className="flex h-full w-full flex-row gap-10 overflow-hidden">
			<LeftBar />
			<RightArea />
		</div>
	);
};
