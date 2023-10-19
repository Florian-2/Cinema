import Image from "next/image";
import tmdbIcon from "@/assets/icons/tmdb.svg";

type Props = {
	rating: number;
	votes?: number;
	sizeIcon: number;
};

export function Rating({ rating, votes, sizeIcon }: Props) {
	const ratingFormat = Math.round(rating * 10) / 10; // 7.236 => 7.2

	return (
		<div className="flex items-center gap-2">
			<Image
				src={tmdbIcon}
				alt="icon tmdb"
				width={sizeIcon}
			/>

			<p className="text-xs">
				{ratingFormat} note {votes && `| ${votes} votes`}
			</p>
		</div>
	);
}
