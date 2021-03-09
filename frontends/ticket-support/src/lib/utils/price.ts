// Because backend returns all prices as cents,
// we divide by 100 when displaying prices
export const formatDisplayPrice = (priceInteger?: Total | null) =>
  priceInteger ? (priceInteger / 100).toFixed(2) : 0;

// These functions are here to help understand what is going on
// when dealing with prices instead of having
// `* 100` or `/ 100` all over the codebase
export const toCents = (price?: number | null): TotalInCents =>
  price ? price * 100 : 0;
export const fromCents = (priceInCents?: number | null): Total =>
  priceInCents ? priceInCents / 100 : 0;

// Useful types to mark where a number with a total is used
// and where a number with a total in cents is used instead of
// the plain TS `number`
// The `_type` is used to differentiate between the two so that we can't assign
// `Total` to `TotalInCents` and the other way around
export type Total = number & { _type?: 'total' };
export type TotalInCents = number & { _type?: 'totalInCents' };
