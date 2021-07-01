import { FetchResult, TypedDocumentNode } from '@apollo/client';
import { GraphQLParams } from '@websummit/graphql';
import {
  CommerceCreateDealDocument,
  CommerceCreateDealMutation,
  CommerceCreateDealMutationVariables,
} from '@websummit/graphql/src/@types/operations';

import { CreateDiscountWorkUnit } from './workUnit';

export async function processCreateDiscountWorkUnit(
  workUnit: CreateDiscountWorkUnit,
  context: GraphQLParams,
  forceUpdate: () => void,
) {
  workUnit.processStatus = {
    message: 'Starting to create the Discount',
    type: 'PENDING',
  };
  forceUpdate();

  const variables: CommerceCreateDealMutationVariables = {
    // @ts-ignore
    commerceDealCreate: {
      ...workUnit.template,
    },
  };

  const result: FetchResult<CommerceCreateDealMutation> | undefined =
    await context.apolloClient?.mutate({
      context: {
        slug: context.slug,
        token: context.token,
      },
      mutation:
        CommerceCreateDealDocument as TypedDocumentNode<CommerceCreateDealMutation>,
      variables,
    });

  if (!result || result.errors) {
    workUnit.processStatus = {
      message: `There were errors when creating the Discount: ${result?.errors}`,
      type: 'ERROR',
    };
    return workUnit;
  }

  const deal = result.data?.commerceCreateDeal;
  if (!deal) {
    workUnit.processStatus = {
      message: `There were errors when creating the Discount: 
      It seems like you do not have the permissions needed to perform this action.
      If you think this is an error, contact the Ticket Machine Team!`,
      type: 'ERROR',
    };
    return workUnit;
  }

  workUnit.processStatus = {
    message: `Created an order with reference: ${deal.code}`,
    type: 'SUCCESS',
  };
  workUnit.code = deal.code || '';
  return workUnit;
}
