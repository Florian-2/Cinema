import { Loader2 } from "lucide-react";

export function Loader() {
	return (
		<div className="col-span-4 flex justify-center items-center">
			<Loader2 className="h-14 w-14 animate-spin" />
		</div>
	);
}
