import { createSafeActionClient } from "next-safe-action";

export class ActionError extends Error {}

export const action = createSafeActionClient({
	handleReturnedServerError(e) {
		if (e instanceof ActionError) {
			return {
				serverError: e.message,
			};
		}

		return {
			serverError: "Une erreur est survenu", // Erreur générique
		};
	},
});
