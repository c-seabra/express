import { FetchResult } from '@apollo/client';
import {
  CommerceOrderStatus,
  CreateOrderMutation,
  useCreateOrderMutation,
} from '@websummit/graphql/src/@types/operations';

export type StatusType = {
  message: string;
  type: 'QUEUED' | 'PENDING' | 'SUCCESS' | 'ERROR';
};

export type CreateOrderWorkUnit = {
  email: string;
  firstName: string;
  lastName: string;
  notify: boolean;
  singleTicket?: {
    bookingRef?: string;
    productID: string;
  };
  slug: string;
  status: StatusType;
  token: string;
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

export function defaultStatus() {
  return {
    message: 'Waiting for other operations to finish before this one starts',
    type: 'QUEUED',
  };
}

export async function processCreateOrderWorkUnit(
  workUnit: CreateOrderWorkUnit,
) {
  workUnit.status = {
    message: 'Starting to create the Order',
    type: 'PENDING',
  };

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

  const context = {
    slug: workUnit.slug,
    token: workUnit.token,
  };

  const variables = {
    input: {
      customer: {
        email: workUnit.email,
        firstName: workUnit.firstName,
        lastName: workUnit.lastName,
      },
      items: productsList,
      metadata: {},
      status: CommerceOrderStatus.Complete,
    },
    storeId: '',
  };

  if (workUnit.notify) {
    variables.input.metadata = {
      disableEmailNotification: true,
      disableOrderEmail: true,
    };
  }

  const [createOrder] = useCreateOrderMutation();
  const result: FetchResult<CreateOrderMutation> = await createOrder({
    context, variables
  });

  if (result.errors) {
    workUnit.status = {
      message: `There were errors when creating the Order: ${result.errors}`,
      type: 'ERROR',
    };
    return workUnit;
  }

}
