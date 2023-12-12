import { Credit as CreditInterface } from "@/shared/interfaces";
import { getMedias } from "@/services/media.services";
import { Credit } from "./Credit";
import { MoreCredits } from "./MoreCredits";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
		<ScrollArea
			className="whitespace-nowrap rounded-md"
			type="always"
		>
			<div className="pb-2 flex items-center justify-between gap-5">
				{credits.slice(0, 10).map((credit) => (
					<Credit
						key={credit.id}
						person={credit}
					/>
				))}

				{credits.length > 10 && <MoreCredits credits={credits} />}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
