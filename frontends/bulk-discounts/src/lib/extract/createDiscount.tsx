import { FetchResult, TypedDocumentNode } from '@apollo/client';
import { GraphQLParams } from '@websummit/graphql';
import {
  CommerceCreateDealDocument,
  CommerceCreateDealMutation,
  CommerceCreateDealMutationVariables,
  CommerceCreateOrderMutationVariables,
  CommerceDeal,
  CommerceOrderStatus,
} from '@websummit/graphql/src/@types/operations';

export type StatusType = {
  message: string;
  type: 'QUEUED' | 'PENDING' | 'SUCCESS' | 'ERROR';
};

export type CreateDiscountWorkUnit = {
  code?: string;
  status: StatusType;
  template: CommerceDeal;
};

export function defaultStatus(): StatusType {
  return {
    message: 'Waiting for other operations to finish before this one starts',
    type: 'QUEUED',
  };
}

export type WorkUnitContext = {};

export function transformTemplateIntoWorkUnit(
  template: CommerceDeal,
): CreateDiscountWorkUnit {
  return {
    status: defaultStatus(),
    template,
  };
}

export async function processCreateDiscountWorkUnit(
  workUnit: CreateDiscountWorkUnit,
  context: GraphQLParams,
  forceUpdate: () => void,
) {
  workUnit.status = {
    message: 'Starting to create the Discount',
    type: 'PENDING',
  };
  forceUpdate();

  const variables: CommerceCreateDealMutationVariables = {
    commerceDealCreate: {
      ...workUnit.template,
    },
  };

  const result:
    | FetchResult<CommerceCreateDealMutation>
    | undefined = await context.apolloClient?.mutate({
    context: {
      slug: context.slug,
      token: context.token,
    },
    mutation: CommerceCreateDealDocument as TypedDocumentNode<CommerceCreateDealMutation>,
    variables,
  });

  if (!result || result.errors) {
    workUnit.status = {
      message: `There were errors when creating the Discount: ${result?.errors}`,
      type: 'ERROR',
    };
    return workUnit;
  }

  const deal = result.data?.commerceCreateDeal;
  if (!deal) {
    workUnit.status = {
      message: `There were errors when creating the Discount: 
      It seems like you do not have the permissions needed to perform this action.
      If you think this is an error, contact the Ticket Machine Team!`,
      type: 'ERROR',
    };
    return workUnit;
  }

  workUnit.status = {
    message: `Created an order with reference: ${deal.code}`,
    type: 'SUCCESS',
  };
  workUnit.code = deal.code || '';
  return workUnit;
}
