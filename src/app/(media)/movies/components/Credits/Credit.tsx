import Image from "next/image";
import { Credit as CreditInterface } from "@/interfaces";

type Props = {
	person: CreditInterface;
};

export function Credit({ person }: Props) {
	const thumbnail = `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w185${person.profile_path}`;

	return (
		<div className="max-w-[130px] flex flex-col items-center gap-2">
			{person.profile_path ? (
				<Image
					src={thumbnail}
					alt={`Photo de ${person.original_name}`}
					width={96}
					height={96}
					className="rounded-full w-24 h-24 object-cover object-center"
				/>
			) : (
				<div className="rounded-full w-24 h-24 bg-zinc-100 dark:bg-zinc-100/30"></div>
			)}

			<div className="w-full flex flex-col items-center">
				<p className="w-full text-center font-medium truncate overflow-hidden">{person.original_name}</p>
				<p className="w-full text-center text-sm truncate overflow-hidden">({person.character})</p>
			</div>
		</div>
	);
}
