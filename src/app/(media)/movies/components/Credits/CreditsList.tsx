import { Credit as CreditInterface } from "@/interfaces";
import { getMedias } from "@/services/media.services";
import { Credit } from "./Credit";
import { MoreCredit } from "./MoreCredits";

type Props = {
	movieId: number;
};

export async function CreditsList({ movieId }: Props) {
	const { cast } = await getMedias<{ cast: CreditInterface[] }>(`/movie/${movieId}/credits`);

	const credits = cast.filter((person) => person.known_for_department === "Acting");

	return (
		<div className="flex items-center gap-5 justify-between overflow-x-auto">
			{credits.slice(0, 10).map((credit) => (
				<Credit
					key={credit.id}
					person={credit}
				/>
			))}

			{credits.length > 7 && <MoreCredit credits={credits} />}
		</div>
	);
}
