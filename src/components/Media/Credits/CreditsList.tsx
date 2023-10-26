import { Credit as CreditInterface } from "@/shared/interfaces";
import { getMedias } from "@/services/media.services";
import { Credit } from "./Credit";
import { MoreCredits } from "./MoreCredits";

type Props = {
	mediaId: number;
	type: "movie" | "tv";
};

export async function CreditsList({ mediaId, type }: Props) {
	const { cast } = await getMedias<{ cast: CreditInterface[] }>(`/${type}/${mediaId}/credits`);

	const credits = cast.filter((person) => person.known_for_department === "Acting");

	if (!credits.length) {
		return <p>Auncune donnée disponible...</p>;
	}

	return (
		<div className="pb-2 flex items-center gap-5 justify-between overflow-x-auto">
			{credits.slice(0, 10).map((credit) => (
				<Credit
					key={credit.id}
					person={credit}
				/>
			))}

			{credits.length > 10 && <MoreCredits credits={credits} />}
		</div>
	);
}
