import { Skeleton } from "../ui/skeleton";

type Props = {
	elements: number;
};

export function SkeletonCredit({ elements }: Props) {
	const skeletonElements = Array.from({ length: elements });

	return (
		<div className="overflow-x-auto flex gap-7">
			{skeletonElements.map((_, index) => (
				<div
					key={index}
					className="flex-shrink-0 flex flex-col items-center gap-2"
				>
					<Skeleton className="rounded-full w-24 h-24" />

					<div className="flex flex-col items-center gap-2">
						<Skeleton className="w-16 h-3" />
						<Skeleton className="w-14 h-3" />
					</div>
				</div>
			))}
		</div>
	);
}
