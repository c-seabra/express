export type AnyJson = boolean | number | string | null | JsonArray | JsonObject;
export interface JsonObject {
  [key: string]: AnyJson | undefined;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<AnyJson> {}
