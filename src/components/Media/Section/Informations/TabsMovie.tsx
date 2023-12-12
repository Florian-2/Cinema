import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie } from "@/shared/interfaces";
import { formatCurrency } from "@/lib";
import { ExternalLink } from "lucide-react";
import { ProductionsCompanies } from "../../Companies";
import { BoxOffice } from "../../BoxOffice";

type Props = {
	movie: Movie;
};

export async function TabsMovie({ movie }: Props) {
	const productionCountries = movie.production_countries.map((country) => country.name).join(", ");
	const languages = movie.spoken_languages.map((lang) => lang.name).join(", ");

	return (
		<Tabs defaultValue="details">
			<TabsList>
				<TabsTrigger value="details">Détails</TabsTrigger>
				<TabsTrigger value="productions">Productions</TabsTrigger>
				<TabsTrigger value="box-office">Box-office</TabsTrigger>
			</TabsList>

			<TabsContent value="details">
				<div className="flex flex-col gap-3">
					<ul className="space-y-1">
						<li>
							<span className="font-medium">Titre original</span>: {movie.original_title}
						</li>
						{movie.homepage && (
							<li className="flex gap-1">
								<span className="font-medium">Site: </span>
								<Link
									target="_blank"
									href={movie.homepage}
									className="flex items-center gap-2 underline"
								>
									{movie.homepage}
									<ExternalLink size={15} />
								</Link>
							</li>
						)}
						<li>
							<span className="font-medium">Statut</span>:{" "}
							{movie.status === "Released" ? "Sorti" : movie.status}
						</li>
						<li>
							<span className="font-medium">Pays de production</span>: {productionCountries}
						</li>
						<li>
							<span className="font-medium">Langue{movie.spoken_languages.length > 1 && "s"}</span>:{" "}
							{languages}
						</li>
						{movie.imdb_id && (
							<li className="flex gap-1">
								<span className="font-medium">IMDb: </span>
								<Link
									target="_blank"
									href={`https://www.imdb.com/title/${movie.imdb_id}`}
									className="flex items-center gap-2 underline"
								>
									{movie.title}
									<ExternalLink size={15} />
								</Link>
							</li>
						)}
						<li className="flex gap-1">
							<span className="font-medium">TMDb: </span>
							<Link
								target="_blank"
								href={`https://www.themoviedb.org/movie/${movie.id}?langue=fr`}
								className="flex items-center gap-2 underline"
							>
								{movie.title}
								<ExternalLink size={15} />
							</Link>
						</li>
					</ul>
				</div>
			</TabsContent>

			<TabsContent value="productions">
				<ProductionsCompanies movie={movie} />
			</TabsContent>

			<TabsContent value="box-office">
				<BoxOffice movie={movie} />
			</TabsContent>
		</Tabs>
	);
}
