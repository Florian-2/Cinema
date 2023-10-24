import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Movie } from "@/interfaces";
import { formatCurrency } from "@/lib/number";
import { getMedias } from "@/services";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
	movie: Movie;
};

interface Provider {
	[key: string]: {
		link: string;
		rent: {
			logo_path: string;
			provider_id: number;
			provider_name: string;
			display_priority: number;
		}[];
		buy: [
			{
				logo_path: string;
				provider_id: number;
				provider_name: string;
				display_priority: number;
			}
		];
	};
}

export async function TabsMovie({ movie }: Props) {
	// const { results } = await getMedias<{ results: Provider[] }>(`/movie/${movie.id}/watch/provider`);
	const productionCountries = movie.production_countries.map((country) => country.name).join(", ");
	const productionCompanies = movie.production_companies.map((company) => company.name).join(", ");
	const languages = movie.spoken_languages.map((lang) => lang.name).join(", ");

	// console.log(results);

	return (
		<Tabs defaultValue="informations">
			<TabsList>
				<TabsTrigger value="informations">À savoir</TabsTrigger>
				<TabsTrigger value="providers">Où regarder ?</TabsTrigger>
			</TabsList>

			<TabsContent value="informations">
				<div className="flex flex-col gap-3 p-4 bg-zinc-100 rounded-lg">
					<ul>
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
					</ul>

					<hr />

					<ul>
						<li>
							<span className="font-medium">Sociétés de production</span>: {productionCompanies}
						</li>
						<li>
							<span className="font-medium">Budget</span>: {formatCurrency(movie.budget)}
						</li>
						<li>
							<span className="font-medium">Revenu</span>: {formatCurrency(movie.revenue)}
						</li>
					</ul>
				</div>
			</TabsContent>
			<TabsContent value="providers">
				<ul>
					<li>
						<span className="font-medium">Sociétés de production</span>: {productionCompanies}
					</li>
					<li>
						<span className="font-medium">Budget</span>: {formatCurrency(movie.budget)}
					</li>
					<li>
						<span className="font-medium">Revenu</span>: {formatCurrency(movie.revenue)}
					</li>
				</ul>
			</TabsContent>
		</Tabs>
	);
}
