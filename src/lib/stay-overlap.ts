/** Checkout day is free for the next check-in. Ranges overlap when one starts before the other ends. */
export function staysOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): boolean {
  const aStart = startA.slice(0, 10);
  const aEnd = endA.slice(0, 10);
  const bStart = startB.slice(0, 10);
  const bEnd = endB.slice(0, 10);
  return aStart < bEnd && aEnd > bStart;
}

export function parseStayDate(value: string): Date {
  const [year, month, day] = value.slice(0, 10).split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}
