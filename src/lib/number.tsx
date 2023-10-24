export function formatCurrency(number: number) {
	const intl = new Intl.NumberFormat("fr", { style: "currency", currency: "USD" });
	return intl.format(number);
}
