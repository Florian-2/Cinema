import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function ResetSearch() {
	const router = useRouter();

	const handleClick = () => router.push("/movies");

	return (
		<div className="flex flex-col justify-center items-center col-span-4 gap-2">
			<p className="text-center">Aucun résultat</p>
			<Button onClick={handleClick}>Réinitialiser</Button>
		</div>
	);
}
