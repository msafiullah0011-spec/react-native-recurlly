export function formatMoney(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
