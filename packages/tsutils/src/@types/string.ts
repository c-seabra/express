/**
 * This type allows you to accept string literals
 *
 * String literals are known at compile time and
 * can be type checked similar to enums
 *
 * @example only allow certain options of string values
 * ```ts
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
 *
 * @example assert that the other parameter can handle all the options
 *
 * You can also use this to leave T to be defined by the caller
 * With that you can do more complex type assertions, such as
 * asserting that a different parameter can handle
 * all cases of T as input
 *
 * ```tsx
 * function StatusList<Enum>(
 *   list: StringLiteral<Enum>[],
 *   Status: React.FC<{status: Enum}>
 * ) {
 *  return (<>
 *    {list.map((elem) =>
 *      <Status status={elem}></>
 *    )}
 *  </>);
 * }
 * ```
 *
 * @typeParam T - The generic type that is guaranteed to be a string literal
 */
export type StringLiteral<T> = T extends string
  ? string extends T
    ? never
    : T
  : never;
