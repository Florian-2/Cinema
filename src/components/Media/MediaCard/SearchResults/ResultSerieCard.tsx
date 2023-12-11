import Link from "next/link";
import { SerieLight } from "@/shared/interfaces";
import { CardInfos, Thumbnail, CardContent } from "./ui";

type Props = {
	serie: SerieLight;
};

export function ResultSerieCard({ serie }: Props) {
	const imgSrc = serie.poster_path ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w185/${serie.poster_path}` : "";
	const releasYear = serie.first_air_date ? new Date(serie.first_air_date).getFullYear() : undefined;

	return (
		<Link href={`/series/${serie.id}`}>
			<CardContent>
				<Thumbnail
					src={imgSrc}
					alt={serie.original_name}
				/>

				<CardInfos
					title={serie.original_name}
					releasYear={releasYear}
				/>
			</CardContent>
		</Link>
	);
}
