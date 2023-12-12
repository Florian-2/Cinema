import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2, SearchIcon } from "lucide-react";

type Props = ButtonProps & {
	isLoading: boolean;
};

export function SearchButton({ isLoading, ...props }: Props) {
	return (
		<Button
			variant="outline"
			disabled={isLoading}
			className="p-2"
			{...props}
		>
			{isLoading ? (
				<Loader2
					width={22}
					height={22}
					className="animate-spin"
				/>
			) : (
				<SearchIcon
					width={22}
					height={22}
				/>
			)}
		</Button>
	);
}
