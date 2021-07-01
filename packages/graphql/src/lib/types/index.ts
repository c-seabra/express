import { Maybe } from 'graphql/jsutils/Maybe';

export type PageInfo = {
  endCursor: string;
  hasNextPage: string;
  hasPreviousPage: string;
  startCursor: string;
};

/*
  All of the queries return types that are nullable.
  Codegen reflects that as a generic Maybe<> type.
  Sometimes, we'd like to know what the type inside of the generic is
  for example when passing said object to functions or components.
  This is a helper type that allows us to get to that type inside the Maybe.

  Example:
    A GraphQL query returns a partial CommerceStore object with only 'id' and 'name' fields.
    We want to type a function that takes an object of said type and does something with it.
    Because the query result can be nullable, it is wrapped in a Maybe<>.
    To get to that type we would have to manually declare a Pick<CommerceStore, 'id' | 'name'> type
    after looking at the schema and generated types.

    Instead, we can just rely on what is inside the query by doing
    `extractTypeFromMaybe<CommerceStoreQueryResult>`.

    The advantage of this approach is that if the query is changed and we regenerate the types,
    the added fields will be added to that function signature out of the box instead of having to
    add the field to our Pick type manually.
 */
export type extractTypeFromMaybe<Type> = Type extends Maybe<infer X>
  ? X
  : never;

/*
  Stores queries to list entities have a prefix of CommerceList (CommerceListStores for instance).

  Taking the example of CommerceListStores:
    We take the generated type reflecting the query structure which is
    CommerceListStoresQuery (given to us by codegen) and extract the partial type of the entity
    since the returned object, wrapped in Maybe, looks like so
    `
      commerceListStores: {
        hits: { // This is the type we want to get to
          ...selectedFields
        }
      }
    `

    To get the aforementioned type, we use
    `CommerceListQueryHitsResults<CommerceListStoresQuery, 'commerceListStores'>`
    The first generic parameter Query is the query type - imported from codegen
    The second generic parameter T is the name of the result returned which is
    inside of the Query type itself - e.g. 'commerceListStores'
 */
export type CommerceListQueryHitsResult<
  Query,
  T extends keyof Query, // Name of the query here e.g. commerceListProducts
> = NonNullable<extractTypeFromMaybe<Query[T]>> extends { hits: any }
  ? NonNullable<extractTypeFromMaybe<Query[T]>>['hits']
  : never;

/*
  Much like the above type, this one applies to CommerceGet queries such as
  CommerceGetStore.

  `CommerceGetQueryResult<CommerceGetStoreQuery, 'commerceGetStore'>`
 */
export type CommerceGetQueryResult<Query, T extends keyof Query> = NonNullable<
  // Name of the query here e.g. commerceGetStore
  extractTypeFromMaybe<Query[T]>
>;

/*
  Since Ticket Assignment queries return a similar structure to the one from stores,
  this type was created to avoid confusion whether something comes from stores or TA.

  Seeing a `CommerceGetQueryResult` would give a false sense that the type comes from stores,
  even though the strucutre is the same.
 */
export type GetQueryResult<
  Query,
  T extends keyof Query,
> = CommerceGetQueryResult<Query, T>;
