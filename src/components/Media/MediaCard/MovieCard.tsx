import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MovieLight } from "@/shared/interfaces";
import { Rating } from "./Rating";
import { Button } from "@/components/ui/button";
import { Overlay } from "./Overlay";

type Props = {
	media: MovieLight;
	className?: string;
};

export function MovieCard({ media, className }: Props) {
	const link = `/movies/${media.id}`;
	const backgroundImg = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w500${media.poster_path}`;

	console.log(media.vote_average);

	return (
		<article className={`h-[400px] relative rounded-3xl overflow-hidden ${className ? className : ""}`}>
			<Overlay>
				{media.poster_path && (
					<Image
						src={backgroundImg}
						alt={media.title}
						fill
						className="object-cover"
						sizes=""
					/>
				)}
			</Overlay>

			<div className="w-full absolute bottom-0 space-y-5 z-20 p-4 text-white bg-gradient-overlay">
				<div>
					<h3 className="text-2xl font-medium">{media.title}</h3>
					{media.release_date && (
						<p className="text-sm">{format(new Date(media.release_date), "d LLL yyyy", { locale: fr })}</p>
					)}
				</div>

				<div className={`flex ${media.vote_average ? "justify-between" : "justify-end"}`}>
					{media.vote_average && (
						<Rating
							rating={media.vote_average}
							sizeIcon={30}
						/>
					)}

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
