// Because backend returns all prices as cents,
// we divide by 100 when displaying prices
export const formatDisplayPrice = (priceInteger?: number | null) =>
  priceInteger ? (priceInteger / 100).toFixed(2) : 0;

// These functions are here to help understand what is going on
// when dealing with prices instead of having
// `* 100` or `/ 100` all over the codebase
export const toCents = (price?: number | null) => (price ? price * 100 : 0);
export const fromCents = (priceInCents?: number | null) =>
  priceInCents ? priceInCents / 100 : 0;

// Useful types to mark where a number with a total is used
// and where a number with a total in cents is used instead of
// the plain TS `number`
export type Total = number;
export type TotalInCents = number;
