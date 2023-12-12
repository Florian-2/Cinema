"use client";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const responsive = {
	0: {
		items: 1,
	},
	640: {
		items: 2,
	},
	1024: {
		items: 3,
	},
	1280: {
		items: 4,
	},
};

export function Slider({ data }: { data: JSX.Element[] }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="h-[420px] flex gap-5">
				<Skeleton className="flex-grow shadow-sm" />
				<Skeleton className="hidden flex-grow shadow-sm sm:inline-flex" />
				<Skeleton className="hidden flex-grow shadow-sm md:inline-flex" />
				<Skeleton className="hidden flex-grow shadow-sm xl:inline-flex" />
			</div>
		);
	}

	const prevBtn = () => {
		return (
			<Button
				size="icon"
				variant="outline"
				className="absolute top-1/2 -translate-y-1/2 left-[-5px] border-2 border-black/80 dark:border-white/80 rounded-lg"
			>
				<ChevronLeft className="h-5 w-5" />
			</Button>
		);
	};

	const nextBtn = () => {
		return (
			<Button
				size="icon"
				variant="outline"
				className="absolute top-1/2 -translate-y-1/2 right-[-5px] border-2 border-black/80 dark:border-white/80 rounded-lg"
			>
				<ChevronRight className="h-5 w-5" />
			</Button>
		);
	};

	return (
		<div className="relative">
			<AliceCarousel
				// autoPlay
				// autoPlayInterval={3000}
				mouseTracking
				items={data}
				responsive={responsive}
				infinite
				// controlsStrategy="alternate"
				disableDotsControls
				renderPrevButton={prevBtn}
				renderNextButton={nextBtn}
			/>
		</div>
	);
}
