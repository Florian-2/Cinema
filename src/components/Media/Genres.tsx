import { Badge } from "@/components/ui/badge";

type Props = {
	genres: { id: number; name: string }[];
};

export function Genres({ genres }: Props) {
	return (
		<div className="flex gap-3">
			{genres.map((genre) => (
				<Badge
					key={genre.id}
					className="bg-white text-black text-center"
				>
					{genre.name}
				</Badge>
			))}
		</div>
	);
}
