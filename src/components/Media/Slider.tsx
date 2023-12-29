"use client";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

export function Slider({ data }: { data: JSX.Element[] }) {
	return (
		<Carousel
			opts={{
				align: "end",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 3000,
					stopOnInteraction: false,
					stopOnMouseEnter: true,
				}),
			]}
		>
			<CarouselContent>
				{data.map((media, i) => (
					<CarouselItem
						className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
						key={i}
					>
						{media}
					</CarouselItem>
				))}
			</CarouselContent>

			<div className="hidden sm:block">
				<CarouselPrevious />
				<CarouselNext />
			</div>
		</Carousel>
	);
}
