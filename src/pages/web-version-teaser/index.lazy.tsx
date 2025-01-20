import { Icon } from '&shared/ui/icon';
import { Logo } from '&shared/ui/logo';
import { Typography } from '&shared/ui/typography';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/web-version-teaser/')({
	component: RouteComponent
});

const imgUrl = new URL('./-assets/web_version_preview.png', import.meta.url).href;
const imgUrl2x = new URL('./-assets/web_version_preview@2x.png', import.meta.url).href;
const imgUrl3x = new URL('./-assets/web_version_preview@3x.png', import.meta.url).href;

function RouteComponent() {
	return (
		<div className="h-screen w-screen bg-color-bg-95 flex flex-col">
			<header className="w-full py-9 px-12">
				<Logo className="w-20 h-9" />
			</header>
			<div className="flex flex-col justify-center grow">
				<section className="relative mx-auto w-[86%] max-w-[1486px] flex flex-col items-center max-h-[75vh] bg-color-bg-100 rounded-tl-[40px] rounded-tr-[40px] pt-20 overflow-hidden">
					<div className="bg-gradient-to-b from-[#ffffff00] to-color-bg-95 w-full h-[235px] bottom-0 left-0 right-0 absolute z-10"></div>
					<header className="flex flex-col items-center">
						<div className="rounded-[16px] flex items-center justify-center bg-[#ecf0ff] h-[68px] w-[68px]">
							<Icon name="cog" className="w-9 h-9 text-color-brand-primary-50" />
						</div>
						<Typography variant="heading-1">Допиливаем веб версию</Typography>
						<Typography variant="heading-3" className="text-color-gray-80">
							Приходи в конце января
						</Typography>
					</header>
					<div></div>
					<main className="justify-self-end h-[607px] translate-y-[135px]">
						<picture>
							<source srcSet={`${imgUrl2x} 2x, ${imgUrl3x} 3x`} />
							<img src={imgUrl} alt="Web version teaser" />
						</picture>
					</main>
				</section>
			</div>
		</div>
	);
}
