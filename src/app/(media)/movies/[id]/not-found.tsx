import Link from "next/link";

export default function NotFoundMovie() {
	return (
		<div className="h-full flex flex-col justify-center items-center gap-3">
			<h1 className="text-xl text-center">Film introuvable</h1>
			<Link
				href={"/"}
				className="underline"
			>
				Accueil
			</Link>
		</div>
	);
}
