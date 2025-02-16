import { Button } from '&shared/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '&shared/ui/dialog';
import { Label } from '&shared/ui/label';
import { RadioGroup, RadioGroupItem } from '&shared/ui/radio-group';

export function SubscribeModalWidget() {
	return (
		<DialogContent className="bg-white">
			<DialogHeader>
				<DialogTitle>Выберите длительность подписки:</DialogTitle>
			</DialogHeader>
			<DialogDescription className="flex flex-col gap-6">
				<RadioGroup className="flex flex-col gap-4">
					<div className="flex flex-row items-center justify-between">
						<div className="flex gap-2">
							<RadioGroupItem value="1m" id="1m" />
							<Label htmlFor="1m">1 месяц</Label>
						</div>
						<div className="flex flex-col gap-2">
							<span>390 Р</span>
							<span>390 Р / мес</span>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between">
						<div className="flex gap-2">
							<RadioGroupItem value="3m" id="3m" />
							<Label htmlFor="1m">3 месяца</Label>
						</div>
						<div className="flex flex-col gap-2">
							<span>990 Р</span>
							<span>330 Р / мес</span>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between">
						<div className="flex gap-2">
							<RadioGroupItem value="1y" id="1y" />
							<Label htmlFor="1y">1 год</Label>
						</div>
						<div className="flex flex-col gap-2">
							<span>3290 Р</span>
							<span>274 Р / мес</span>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between">
						<div className="flex gap-2">
							<RadioGroupItem value="forever" id="forever" />
							<Label htmlFor="forever">Навседа</Label>
						</div>
						<div className="flex flex-row gap-2">
							<span className="line-through">7800 Р</span>
							<span>3900 Р / мес</span>
						</div>
					</div>
					<Button variant="button" appearance="primary" className="w-full">
						Оплатить
					</Button>
					<div>
						Нажимая на кнопку "Оплатить", вы соглашаетесь с{' '}
						<a
							className="text-color-brand-primary-50"
							href="https://hyle.app/personalData.pdf"
							target="_blank"
							referrerPolicy="no-referrer"
						>
							политикой конфиденциальности
						</a>
						,&nbsp;
						<a
							className="text-color-brand-primary-50"
							href="https://hyle.app/termsOfUse.pdf"
							target="_blank"
							referrerPolicy="no-referrer"
						>
							условиями использования
						</a>
						, и &nbsp;
						<a
							className="text-color-brand-primary-50"
							href="https://hyle.app/publicOffer.pdf"
							target="_blank"
							referrerPolicy="no-referrer"
						>
							пользовательским соглашением
						</a>
					</div>
				</RadioGroup>
			</DialogDescription>
			<DialogFooter></DialogFooter>
		</DialogContent>
	);
}
