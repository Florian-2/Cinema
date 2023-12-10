import { formatCurrency } from "@/lib";
import { Movie } from "@/shared/interfaces";

type Props = {
	movie: Movie;
};

export function BoxOffice({ movie }: Props) {
	return (
		<ul className="space-y-1">
			<li>
				<span className="font-medium">Budget: </span>
				{movie.budget ? formatCurrency(movie.budget) : <span>N/A</span>}
			</li>

			<li>
				<span className="font-medium">Revenu: </span>
				{movie.revenue ? formatCurrency(movie.revenue) : <span>N/A</span>}
			</li>
		</ul>
	);
}
