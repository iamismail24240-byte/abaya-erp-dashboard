/** BDT amount with Bengali numerals */
export function formatBdt(amount: number) {
  return new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatBnDate(d: Date) {
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "medium",
  }).format(d);
}
