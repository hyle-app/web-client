import { Dialog as DialogType } from '../../model';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';

export const Dialog = ({
	title,
	body,
	actions,
	onClose,
	onConfirm
}: Omit<DialogType, 'onClose' | 'onConfirm'> & { onClose: () => void; onConfirm: () => void }) => {
	const actionsToRender = actions({ onClose, onConfirm });
	return (
		<article className="bg-color-bg-95 rounded-[16px] pt-12 pb-8 px-4 min-w-[min(96vw,480px)]">
			{title && (
				<Typography variant="heading-4" className="font-semibold text-center">
					{title}
				</Typography>
			)}
			{body && (
				<Typography variant="paragraph" className="mt-2 text-center">
					{body}
				</Typography>
			)}
			<div
				className={cn('mt-6 flex w-full', {
					'justify-end': actionsToRender.length === 1,
					'justify-center': actionsToRender.length > 1
				})}
			>
				{actionsToRender.map((action, index) => (
					<div key={index} className="mr-4">
						{action}
					</div>
				))}
			</div>
		</article>
	);
};
