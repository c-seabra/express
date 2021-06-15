import { Maybe } from 'graphql/jsutils/Maybe';

export type PageInfo = {
  endCursor: string;
  hasNextPage: string;
  hasPreviousPage: string;
  startCursor: string;
};

type extractTypeFromMaybe<Type> = Type extends Maybe<infer X> ? X : never;

export type CommerceListQueryHitsResult<
  Query,
  T extends keyof Query // Name of the query here e.g. commerceListProducts
> = NonNullable<extractTypeFromMaybe<Query[T]>> extends { hits: any }
  ? NonNullable<extractTypeFromMaybe<Query[T]>>['hits']
  : never;
