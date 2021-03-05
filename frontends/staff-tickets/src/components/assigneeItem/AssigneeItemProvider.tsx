import {
  CommerceOrderStatus,
  useCreateOrderMutation,
} from '@websummit/graphql/src/@types/operations';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext, Staff } from '../app/App';
import AssigneeItem from './AssigneeItem';

export type StatusType = {
  message: string;
  type: 'PENDING' | 'SUCCESS' | 'ERROR';
};

type AssigneeItemProvider = Staff & { index: number };

const AssigneeItemProvider: React.FC<AssigneeItemProvider> = ({
  index,
  bookingRef,
  firstName,
  lastName,
  email,
}) => {
  const { token, conference } = useContext(AppContext);
  const [status, setStatus] = useState<StatusType>({
    message: 'Assignment is still processing.',
    type: 'PENDING',
  });

  const [ticketAccept] = useCreateOrderMutation({
    onCompleted: ({ ticketAccept }: any) => {
      if (ticketAccept?.userErrors.length) {
        setStatus({
          message: ticketAccept.userErrors[0].message,
          type: 'ERROR',
        });
      } else {
        setStatus({
          message: 'Auto claim was successful',
          type: 'SUCCESS',
        });
      }
    },
  });

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

  useEffect(() => {
    const productsList: Product[] = [];
    if (conference.staffProductId) {
      productsList.push({
        metadata: {
          assignees: [
            {
              bookingReference: bookingRef
                ? bookingRef.toUpperCase()
                : undefined,
              email,
              firstName,
              lastName,
            },
          ],
        },
        product: conference.staffProductId,
        quantity: 1,
      });
    }

    if (conference.guestProductId) {
      productsList.push({
        product: conference.guestProductId,
        quantity: 20,
      });
    }

    if (productsList.length == 0) {
      setStatus({
        message: `No Staff ticket product configured for this conference, please contact engineering!`,
        type: 'ERROR',
      });
    }
    setTimeout(() => {
      ticketAccept({
        context: {
          slug: conference.slug,
          storesToken: token,
        },
        variables: {
          input: {
            customer: {
              email,
              firstName,
              lastName,
            },
            items: productsList,
            metadata: {
              disableEmailNotification: true,
              disableOrderEmail: true,
            },
            status: CommerceOrderStatus.Complete,
          },
          storeId: conference.storeId || '',
        },
      }).catch((e) => {
        console.error(e);
        setStatus({
          message: `Unable to create this ticket - ${bookingRef}`,
          type: 'ERROR',
        });
      });
    }, index * 50);
  }, []);

  return (
    <AssigneeItem
      bookingRef={bookingRef}
      email={email}
      firstName={firstName}
      lastName={lastName}
      status={status}
    />
  );
};

export default AssigneeItemProvider;
