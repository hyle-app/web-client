import { Props } from './types';

export function FormSection({ children }: React.PropsWithChildren<Props>) {
	return <div className="px-8 py-6 border-b border-b-color-gray-10">{children}</div>;
}
