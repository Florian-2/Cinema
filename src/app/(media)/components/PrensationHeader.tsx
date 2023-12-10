import { convertRuntime } from "@/lib";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Props = {
	title: string;
	runtime?: number;
	releaseDate: string | Date;
};

export function PresentationHeader({ title, runtime, releaseDate }: Props) {
	return (
		<div>
			<h1 className="text-3xl leading-tight font-semibold">
				{title}
				{runtime && <span className="ml-2 text-sm align-middle font-normal">- {convertRuntime(runtime)}</span>}
			</h1>

			<p className="text-sm">{format(new Date(releaseDate), "d MMMM yyyy", { locale: fr })}</p>
		</div>
	);
}
