import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
	isLoading?: boolean;
};

export function MoreResults({ isLoading, ...props }: Props) {
	return (
		<Button
			{...props}
			className="gap-3"
			disabled={isLoading}
		>
			{isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
			Plus de résultats
		</Button>
	);
}
