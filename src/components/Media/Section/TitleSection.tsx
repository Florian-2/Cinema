import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function TitleSection({ children }: Props) {
	return <h2 className="text-1.5xl font-medium">{children}</h2>;
}
