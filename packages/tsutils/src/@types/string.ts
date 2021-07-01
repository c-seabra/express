


/**
 * This type allows you to accept string literals
 *
 * String literals are known at compile time and
 * can be type checked similar to enums
 *
 * example:
 * ```
 * type options = 'Yes' | 'No';
 * function hasConfirmed(text: StringLiteral<option>) {
 *   if (text === 'Yes') {
 *     return true;
 *   }
 *   // typescript can infer that text is now 'No'
 *   return false
 * }
 * ```
 *
 * You can also use this to leave T to be defined by the caller
 * With that you can do more complex type assertions, such as
 * asserting that a different parameter can handle
 * all cases of T as input
 *
 * @typeParam T - The generic type that is guaranteed to be a string literal
 */
export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;
