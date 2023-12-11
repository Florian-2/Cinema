import { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export function CardContent({ children }: Props) {
	return <div className="flex gap-5 py-3 transition hover:bg-muted">{children}</div>;
}
