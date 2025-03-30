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
		<article className="min-w-[min(96vw,480px)] rounded-[16px] bg-color-bg-95 px-8 pb-8 pt-12">
			{title && (
				<Typography variant="heading-4" className="text-center font-semibold">
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
