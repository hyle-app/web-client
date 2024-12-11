import { LeftBar } from './LeftBar';
import { RightArea } from './RightArea';

export const Background = () => {
	return (
		<div className="w-full h-full flex flex-row overflow-hidden gap-10">
			<LeftBar />
			<RightArea />
		</div>
	);
};
