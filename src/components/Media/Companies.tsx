import Image from "next/image";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";
import { Movie } from "@/shared/interfaces";

type Props = {
	movie: Movie;
};

export function ProductionsCompanies({ movie }: Props) {
	return (
		<Table className="max-w-3xl">
			<TableHeader>
				<TableRow>
					<TableHead>Logo</TableHead>
					<TableHead>Société</TableHead>
					<TableHead className="text-right">Pays</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{movie.production_companies.map((company, i) => (
					<TableRow key={i}>
						<TableCell>
							{company.logo_path ? (
								<Image
									src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w185/${company.logo_path}`}
									alt={company.name}
									width={90}
									height={100}
								/>
							) : (
								<span>N/A</span>
							)}
						</TableCell>

						<TableCell>{company.name ? company.name : <span>N/A</span>}</TableCell>
						<TableCell className="text-right">
							{company.origin_country ? company.origin_country : <span>N/A</span>}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
