import { ToasterProps } from 'sonner';

const toastOptionsConfig: ToasterProps['toastOptions'] = {
	unstyled: false,
	classNames: {
		toast: 'rounded-2xl border bg-color-error border-2 ',
		success: 'border-success',
		warning: 'border-warning',
		error: 'border-error',
		info: 'border-brand-primary-50'
	}
};

const toastIconsConfig: ToasterProps['icons'] = {};

export const toastOptions: ToasterProps = {
	toastOptions: toastOptionsConfig,

	icons: toastIconsConfig,
	duration: Infinity
};
