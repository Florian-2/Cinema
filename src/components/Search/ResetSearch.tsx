import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function ResetSearch() {
	const router = useRouter();

	const handleClick = () => router.push("/movies");

	return (
		<div className="flex flex-col justify-center items-center col-span-4 gap-3">
			<p className="text-center text-xl">Aucun résultat</p>
			<Button onClick={handleClick}>Réinitialiser</Button>
		</div>
	);
}
