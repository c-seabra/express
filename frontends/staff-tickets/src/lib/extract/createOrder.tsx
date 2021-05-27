import { FetchResult, TypedDocumentNode } from '@apollo/client';
import { GraphQLParams } from '@websummit/graphql';
import {
  CommerceCreateOrderDocument,
  CommerceCreateOrderMutation,
  CommerceOrderStatus,
} from '@websummit/graphql/src/@types/operations';

import { Staff } from '../../components/app/App';
import { StaffList } from './staffList';

export type StatusType = {
  message: string;
  type: 'QUEUED' | 'PENDING' | 'SUCCESS' | 'ERROR';
};

export type CreateOrderWorkUnit = {
  email: string;
  firstName: string;
  lastName: string;
  notify: boolean;
  reference?: string;
  singleTicket?: {
    bookingRef?: string;
    productID: string;
  };
  status: StatusType;
  volumeTickets?: {
    productID: string;
    quantity: number;
  };
};

type Assignee = {
  bookingReference?: string;
  email: string;
  firstName: string;
  lastName: string;
};

type Product = {
  metadata?: {
    assignees?: Assignee[];
  };
  product: string;
  quantity: number;
};

export function defaultStatus(): StatusType {
  return {
    message: 'Waiting for other operations to finish before this one starts',
    type: 'QUEUED',
  };
}

export type WorkUnitContext = {
  guestProductId?: string;
  quantity?: number;
  staffProductId?: string;
};

export function transformStaffIntoWorkUnit(
  context: WorkUnitContext,
  staff: Staff,
): CreateOrderWorkUnit {
  const workUnit: CreateOrderWorkUnit = {
    email: staff.email,
    firstName: staff.firstName,
    lastName: staff.lastName,
    notify: true,
    status: defaultStatus(),
  };
  if (context.staffProductId) {
    const bookingRef: string | undefined =
      staff.bookingRef || StaffList[staff.email];

    workUnit.singleTicket = {
      bookingRef,
      productID: context.staffProductId,
    };
  }
  if (context.guestProductId) {
    workUnit.volumeTickets = {
      productID: context.guestProductId,
      quantity: context.quantity || 20,
    };
  }
  return workUnit;
}

export async function processCreateOrderWorkUnit(
  workUnit: CreateOrderWorkUnit,
  context: GraphQLParams,
  forceUpdate: () => void,
) {
  workUnit.status = {
    message: 'Starting to create the Order',
    type: 'PENDING',
  };
  forceUpdate();

  const productsList: Product[] = [];
  if (workUnit.singleTicket) {
    const bookingRef = workUnit.singleTicket.bookingRef?.toUpperCase();

    productsList.push({
      metadata: {
        assignees: [
          {
            bookingReference: bookingRef,
            email: workUnit.email,
            firstName: workUnit.firstName,
            lastName: workUnit.lastName,
          },
        ],
      },
      product: workUnit.singleTicket.productID,
      quantity: 1,
    });
  }

  if (workUnit.volumeTickets) {
    productsList.push({
      product: workUnit.volumeTickets.productID,
      quantity: workUnit.volumeTickets.quantity,
    });
  }

  if (productsList.length === 0) {
    workUnit.status = {
      message: `There are no tickets in this order!`,
      type: 'ERROR',
    };
    return workUnit;
  }

  const variables = {
    commerceOrderCreate: {
      customer: {
        email: workUnit.email,
        firstName: workUnit.firstName,
        lastName: workUnit.lastName,
      },
      items: productsList,
      metadata: {},
      status: CommerceOrderStatus.Complete,
    },
  };

  if (!workUnit.notify) {
    variables.commerceOrderCreate.metadata = {
      disableEmailNotification: true,
      disableOrderEmail: true,
    };
  }

  const result:
    | FetchResult<CommerceCreateOrderMutation>
    | undefined = await context.apolloClient?.mutate({
    context: {
      slug: context.slug,
      token: context.token,
    },
    mutation: CommerceCreateOrderDocument as TypedDocumentNode<CommerceCreateOrderMutation>,
    variables,
  });

  if (!result || result.errors) {
    workUnit.status = {
      message: `There were errors when creating the Order: ${result?.errors}`,
      type: 'ERROR',
    };
    return workUnit;
  }

  workUnit.status = {
    message: `Created an order with reference: ${result.data?.commerceCreateOrder?.reference}`,
    type: 'SUCCESS',
  };
  workUnit.reference = result.data?.commerceCreateOrder?.reference || '';
  if (workUnit.singleTicket?.bookingRef) {
    workUnit.reference = `${workUnit.reference} (${workUnit.singleTicket?.bookingRef})`;
  }
  return workUnit;
}
