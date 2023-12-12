import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "../../ui/button";

type Props = ButtonProps & {
	isLoading: boolean;
};

export function MoreResults({ isLoading, ...props }: Props) {
	return (
		<Button
			className="gap-3  "
			disabled={isLoading}
			{...props}
		>
			{isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
			Plus de résultats
		</Button>
	);
}
