import { balanceEntity } from '&entities/balance';
import { goalEntity } from '&entities/goal';
import { BalanceCategory } from '&shared/constants';
import { Button } from '&shared/ui/button';
import { Sidebar } from '&shared/ui/sidebar';
import { Typography } from '&shared/ui/typography';
import { cn } from '&shared/utils';
import { useUnit } from 'effector-react';
import React from 'react';
import { inputs } from '../../model';

type CardProps = {
	title: string;
	onClick: () => void;
	className?: string;
	rightSlot?: React.ReactNode;
};

type SidebarProps = {
	isOpen: boolean;
	onClose(): void;
};

const Card = ({ title, onClick, rightSlot, className }: CardProps) => (
	<button
		onClick={onClick}
		className={cn(
			'flex justify-between rounded-[16px] border border-solid border-color-gray-10 bg-color-bg-100 px-6 py-5 text-start',
			className
		)}
	>
		<Typography>{title}</Typography>
		{rightSlot}
	</button>
);

const ALL_CATEGORIES = Object.values(BalanceCategory) as BalanceCategory[];

export const EditBalanceSidebar = ({ isOpen, onClose }: SidebarProps) => {
	const currentCategories = useUnit(balanceEntity.outputs.$categories);
	const { editBalanceCategoriesEvent } = useUnit({
		editBalanceCategoriesEvent: inputs.editBalanceCategories
	});
	const [editedCategory, setEditedCategory] = React.useState<null | BalanceCategory>(null);
	const [categoryToPlace, setCategoryToPlace] = React.useState<null | BalanceCategory>(null);

	const handleCategoryClick = (key: BalanceCategory) => {
		if (editedCategory === null) {
			setEditedCategory(key);
			return;
		}

		setCategoryToPlace(key);
		// TODO:
	};

	const handleCancel = () => {
		setCategoryToPlace(null);
		setEditedCategory(null);
	};

	const handleConfirm = () => {
		if (!editedCategory || !categoryToPlace) return;

		editBalanceCategoriesEvent(
			currentCategories.map((catKey) => {
				return catKey === editedCategory ? categoryToPlace : catKey;
			})
		);

		setCategoryToPlace(null);
		setEditedCategory(null);
	};

	const categoriesSet = React.useMemo(() => {
		if (editedCategory === null) {
			return currentCategories;
		}

		return ALL_CATEGORIES.filter((cat) => !currentCategories.includes(cat));
	}, [editedCategory, currentCategories]);

	return (
		<Sidebar isOpen={isOpen} onClose={onClose} className="flex flex-col bg-color-bg-95 px-8">
			<div className="sticky top-0 bg-color-bg-95 py-6">
				<Typography variant="heading-3">Редактировать сферы жизни</Typography>
			</div>
			<div className="flex grow flex-col gap-4">
				{categoriesSet.map((key) => (
					<Card
						onClick={() => handleCategoryClick(key)}
						title={goalEntity.lib.getCategoryLabel(key)}
						className={key === categoryToPlace ? 'bg-color-brand-primary-80' : ''}
						rightSlot={
							editedCategory === null && (
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M12.7378 5.97181L3.69976 15.0098L3.10876 17.0258L5.08376 16.4548L14.1518 7.38681L12.7378 5.97181ZM14.2798 4.42981L15.6938 5.84381L17.0118 4.52581C17.1055 4.43205 17.1582 4.30489 17.1582 4.17231C17.1582 4.03973 17.1055 3.91257 17.0118 3.81881L16.3038 3.11181C16.21 3.01807 16.0828 2.96542 15.9503 2.96542C15.8177 2.96542 15.6905 3.01807 15.5968 3.11181L14.2808 4.42981H14.2798ZM17.7188 1.69781L18.4258 2.40481C18.8944 2.87363 19.1577 3.5094 19.1577 4.17231C19.1577 4.83522 18.8944 5.47099 18.4258 5.93981L6.13376 18.2328L1.91376 19.4528C1.74175 19.5024 1.55958 19.5049 1.38626 19.4601C1.21295 19.4152 1.05485 19.3247 0.928472 19.1979C0.802091 19.0711 0.712063 18.9127 0.667787 18.7393C0.623511 18.5658 0.62661 18.3837 0.67676 18.2118L1.92476 13.9568L14.1848 1.69681C14.6536 1.22813 15.2894 0.964844 15.9523 0.964844C16.6152 0.964844 17.2509 1.22813 17.7198 1.69681L17.7188 1.69781Z"
										fill="#717DA7"
									/>
								</svg>
							)
						}
					/>
				))}
			</div>
			{editedCategory !== null && (
				<div className="sticky bottom-0 flex flex-col gap-3 bg-color-bg-95 py-6">
					{categoryToPlace !== null && (
						<Button appearance="primary" variant="button" className="w-full" onClick={handleConfirm}>
							Заменить
						</Button>
					)}
					<Button appearance="primary-outline" variant="button" className="w-full" onClick={handleCancel}>
						Отменить
					</Button>
				</div>
			)}
		</Sidebar>
	);
};
