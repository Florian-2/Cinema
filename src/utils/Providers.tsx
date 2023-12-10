"use client";

import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
	children: ReactNode;
};

export default function Providers({ children }: Props) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 24 * 60 * 60 * 1000, // 24h en millisecondes
						refetchOnWindowFocus: false,
					},
				},
			})
	);

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
