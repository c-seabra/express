import React, { useState, useContext, useEffect } from 'react';

import { useMutation } from '@apollo/client';
import CREATE_ORDER_MUTATION from '../../operations/mutations/CreateOrder';

import AssigneeItem from '../assigneeItem/AssigneeItem';

import { AppContext, Staff } from '../app/App';

export type StatusType = {
  message: string;
  type: 'PENDING' | 'SUCCESS' | 'ERROR';
};

type AssigneeItemProvider = Staff;

const AssigneeItemProvider: React.FC<AssigneeItemProvider> = ({
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

  const [ticketAccept] = useMutation(CREATE_ORDER_MUTATION, {
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

  useEffect(() => {
    const productsList = [];
    if (conference.staffProductId) {
      productsList.push({
        product: conference.staffProductId,
        quantity: 1,
        metadata: {
          assignees: [
            {
              firstName: firstName,
              lastName: lastName,
              email: email,
              bookingReference: bookingRef
                ? bookingRef.toUpperCase()
                : undefined,
            },
          ],
        },
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

    ticketAccept({
      context: {
        token,
        slug: conference.slug,
      },
      variables: {
        storeId: conference.storeId,
        input: {
          customer: {
            email: email,
            firstName: firstName,
            lastName: lastName,
          },
          items: productsList,
          status: 'COMPLETE',
        },
      },
    }).catch((e) => {
      console.error(e);
      setStatus({
        message: `Unable to create this ticket - ${bookingRef}`,
        type: 'ERROR',
      });
    });
  }, []);

  return (
    <AssigneeItem
      bookingRef={bookingRef}
      firstName={firstName}
      lastName={lastName}
      email={email}
      status={status}
    />
  );
};

export default AssigneeItemProvider;
