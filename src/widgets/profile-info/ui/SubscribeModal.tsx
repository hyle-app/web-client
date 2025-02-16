import { inputs } from '&features/get-payment-url';
import { authService } from '&shared/services/auth';
import { Button } from '&shared/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '&shared/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '&shared/ui/form/Form';
import { RadioGroup, RadioGroupItem } from '&shared/ui/radio-group';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';

export function SubscribeModal() {
	const { getPaymentUrl, user } = useUnit({
		getPaymentUrl: inputs.getPaymentUrl,
		user: authService.outputs.$user
	});
	const form = useForm({
		defaultValues: {
			subscriptionKind: 'ONE_MONTH'
		}
	});

	const onSubmit = async (data: any) => {
		if (!user) {
			return;
		}
		getPaymentUrl({
			returnHost: window.location.origin,
			kind: data.subscriptionKind,
			userId: user.uid,
			token: await user?.getIdToken()
		});
	};

	return (
		<DialogContent className="bg-white px-14 py-8">
			<DialogHeader>
				<DialogTitle className="text-subheader-1 font-caption-2 text-color-text-and-icon-80">
					Выберите длительность подписки:
				</DialogTitle>
			</DialogHeader>
			<DialogDescription className="flex flex-col">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="subscriptionKind"
							render={({ field }) => (
								<RadioGroup className="flex flex-col gap-2" onValueChange={field.onChange} defaultValue={field.value}>
									<FormItem className="flex flex-row items-center justify-between rounded-2xl bg-color-bg-95 p-4">
										<div className="flex gap-2">
											<FormControl>
												<RadioGroupItem value="ONE_MONTH" id="ONE_MONTH" />
											</FormControl>
											<FormLabel className="text-color-text-and-icon-80" htmlFor="ONE_MONTH">
												1 месяц
											</FormLabel>
										</div>
										<div className="flex flex-col">
											<span>390 Р</span>
											<span className="text-caption-2 text-color-gray-50">390 Р / мес</span>
										</div>
									</FormItem>
									<FormItem className="flex flex-row items-center justify-between rounded-2xl bg-color-bg-95 p-4">
										<div className="flex gap-2">
											<FormControl>
												<RadioGroupItem value="THREE_MONTH" id="THREE_MONTH" />
											</FormControl>
											<FormLabel className="text-color-text-and-icon-80" htmlFor="THREE_MONTH">
												3 месяца
											</FormLabel>
										</div>
										<div className="flex flex-col">
											<span>990 Р</span>
											<span className="text-caption-2 text-color-gray-50">330 Р / мес</span>
										</div>
									</FormItem>
									<FormItem className="flex flex-row items-center justify-between rounded-2xl bg-color-bg-95 p-4">
										<div className="flex gap-2">
											<FormControl>
												<RadioGroupItem value="ONE_YEAR" id="ONE_YEAR" />
											</FormControl>
											<FormLabel className="text-color-text-and-icon-80" htmlFor="ONE_YEAR">
												1 год
											</FormLabel>
										</div>
										<div className="flex flex-col">
											<span>3290 Р</span>
											<span className="text-caption-2 text-color-gray-50">274 Р / мес</span>
										</div>
									</FormItem>
									<FormItem className="flex flex-row items-center justify-between rounded-2xl bg-color-bg-95 p-4">
										<div className="flex items-center gap-2">
											<FormControl>
												<RadioGroupItem value="FOREVER" id="FOREVER" />
											</FormControl>
											<FormLabel className="text-color-text-and-icon-80" htmlFor="FOREVER">
												<div className="flex flex-row items-baseline gap-1">
													<span>Навседа</span>
													<span className="rounded-full bg-color-brand-primary-70 px-2 py-[2px] text-caption-1 text-white">
														-50%
													</span>
												</div>
											</FormLabel>
										</div>
										<div className="flex flex-row gap-1">
											<span className="line-through">7800 Р</span>
											<span>3900 Р / мес</span>
										</div>
									</FormItem>
									<Button variant="button" appearance="primary" className="w-full">
										Оплатить
									</Button>
								</RadioGroup>
							)}
						/>
					</form>
				</Form>
			</DialogDescription>
			<DialogFooter>
				<div className="">
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
			</DialogFooter>
		</DialogContent>
	);
}
