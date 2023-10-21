import { SerieLight } from "@/interfaces";
import Image from "next/image";
import { Rating } from "./Rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/time";

type Props = {
	media: SerieLight;
	className?: string;
};

export function SerieCard({ media, className }: Props) {
	const link = `/series/${media.id}`;
	const backgroundImg = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500${media.poster_path}`;

	return (
		<article className={`h-[400px] relative rounded-3xl overflow-hidden ${className ? className : ""}`}>
			<div className="absolute z-10 w-full h-full before:block before:absolute before:z-50 before:top-0 before:left-0 before:w-full before:h-full before:bg-black/20">
				<Image
					src={backgroundImg}
					alt={media.name}
					fill
					objectFit="cover"
				/>
			</div>

			<div className="w-full absolute bottom-0 z-20 p-4 text-white bg-gradient-overlay">
				<h3 className="text-2xl font-medium">{media.name}</h3>
				<p className="text-sm mb-5">{formatDate(media.first_air_date, "medium")}</p>

				<div className="flex justify-between">
					<Rating
						rating={media.vote_average}
						sizeIcon={30}
					/>

					<Button
						asChild
						variant="blur"
						className="rounded-full"
					>
						<Link href={link}>Détails</Link>
					</Button>
				</div>
			</div>
		</article>
	);
}
