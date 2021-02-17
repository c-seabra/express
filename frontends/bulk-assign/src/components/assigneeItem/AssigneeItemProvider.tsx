import { ApolloError, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';

import TICKET_ACCEPT_MUTATION from '../../operations/mutations/TicketAccept';
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign';
import ASSIGNMENT_USER from '../../operations/queries/AssignmentUserByEmail';
import TICKET_ID_BY_REFERENCE from '../../operations/queries/TicketIdByReference';
import { AppContext, Assignee } from '../app/App';
import AssigneeItem from './AssigneeItem';

export type StatusType = {
  message: string;
  type: 'PENDING' | 'SUCCESS' | 'ERROR';
};

type AssigneeItemProvider = {
  autoClaim?: string;
  bookingRef: string;
  email: string;
  firstName: string;
  lastName: string;
};

const AssigneeItemProvider: React.FC<AssigneeItemProvider> = ({
  bookingRef,
  firstName,
  lastName,
  email,
  autoClaim,
}) => {
  const { token, conferenceSlug } = useContext(AppContext);
  const [status, setStatus] = useState<StatusType>({
    message: 'Assignment is still processing.',
    type: 'PENDING',
  });
  const [claimStatus, setClaimStatus] = useState<StatusType>({
    message: 'Auto claim is still processing.',
    type: 'PENDING',
  });
  const hasAutoClaim = autoClaim?.toLowerCase() === 'true';

  const [ticketAccept] = useMutation(TICKET_ACCEPT_MUTATION, {
    onCompleted: ({
      ticketAccept,
    }: {
      ticketAccept: {
        userErrors: [{ message: string }];
      };
    }) => {
      if (ticketAccept?.userErrors.length) {
        setClaimStatus({
          message: ticketAccept.userErrors[0].message,
          type: 'ERROR',
        });
      } else {
        setClaimStatus({
          message: 'Auto claim was successful',
          type: 'SUCCESS',
        });
      }
    },
  });

  const claimTicket = (ticketId: string) => {
    ticketAccept({
      context: {
        slug: conferenceSlug,
        token,
      },
      variables: {
        ticketId,
      },
    }).catch(() => {
      setStatus({
        message: `Unable to assign this ticket - ${bookingRef}`,
        type: 'ERROR',
      });
    });
  };

  const [ticketAssign] = useMutation(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({
      ticketAssign,
    }: {
      ticketAssign: {
        ticket: {
          assignment: {
            assignee: Assignee;
            state: 'PENDING' | 'ACCEPTED' | 'REJECTED';
          };
        };
        userErrors: [{ message: string }];
      };
    }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        setStatus({
          message: 'Assignment has been successful',
          type: 'SUCCESS',
        });
        if (hasAutoClaim && data?.ticket?.id) claimTicket(data?.ticket?.id);
      }
      if (ticketAssign?.userErrors.length) {
        setStatus({
          message: ticketAssign.userErrors[0].message,
          type: 'ERROR',
        });
        setClaimStatus({
          message: `${ticketAssign.userErrors[0].message} - and can not auto claim`,
          type: 'ERROR',
        });
      }
    },
  });

  const { data: newAssignmentUserData } = useQuery(ASSIGNMENT_USER, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: (data: {
      assignmentUser?: {
        assigneeAssignments?: {
          edges?: [
            {
              node?: {
                assignee?: {
                  email?: string;
                };
              };
            },
          ];
        };
      };
      userErrors?: [{ message: string }];
    }) => {
      if (
        data?.assignmentUser?.assigneeAssignments?.edges?.[0]?.node?.assignee
          ?.email
      ) {
        setStatus({
          message: 'Current assignee email is same as new assignee email.',
          type: 'ERROR',
        });
      }
      if (data?.userErrors?.length) {
        setStatus({
          message: data.userErrors[0].message,
          type: 'ERROR',
        });
      }
    },
    variables: {
      email,
    },
  });

  const {
    loading,
    error,
    data,
  }: {
    data?: {
      ticket?: {
        assignment: {
          assignee: Assignee;
          state: 'PENDING' | 'ACCEPTED' | 'REJECTED';
        };
        id: string;
        state: string;
        userErrors?: [{ message: string }];
      };
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(TICKET_ID_BY_REFERENCE, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: (data) => {
      if (!data?.ticket?.id) {
        setStatus({
          message: `Cannot find Ticket ID for - ${bookingRef}. Your role might not be sufficient for this action.`,
          type: 'ERROR',
        });
        setClaimStatus({
          message: 'Ticket ID is missing and can not auto claim',
          type: 'ERROR',
        });
      }
      if (data?.ticket?.userErrors?.length) {
        setStatus({
          message: data?.ticket?.userErrors?.[0]?.message,
          type: 'ERROR',
        });
        setClaimStatus({
          message: `${data?.ticket?.userErrors?.[0]?.message} - and can not auto claim`,
          type: 'ERROR',
        });
      }
    },
    variables: {
      reference: bookingRef,
    },
  });

  useEffect(() => {
    if (!error && data?.ticket && newAssignmentUserData) {
      const newAssignmentUserEmail =
        newAssignmentUserData?.assignmentUser?.assigneeAssignments?.edges?.[0]
          ?.node?.assignee?.email;
      const ticketState = data.ticket.state;
      const ticketAssignment = data.ticket.assignment;
      const ticketAssignmentState = ticketAssignment?.state;
      const ticketAssignmentEmail = ticketAssignment?.assignee?.email;

      if (
        ticketState !== 'VOID' &&
        (ticketAssignment === null || ticketAssignmentState === 'REJECTED') &&
        !newAssignmentUserEmail &&
        email !== ticketAssignmentEmail &&
        firstName &&
        lastName &&
        data.ticket.id
      ) {
        ticketAssign({
          context: {
            slug: conferenceSlug,
            token,
          },
          variables: {
            email,
            firstName,
            lastName,
            ticketId: data?.ticket?.id,
          },
        }).catch(() => {
          setStatus({
            message: `Unable to assign this ticket - ${bookingRef}`,
            type: 'ERROR',
          });
          setClaimStatus({
            message: 'Can not auto claim',
            type: 'ERROR',
          });
        });
      } else if (ticketState === 'VOID') {
        setStatus({
          message: 'This ticket has been voided and cannot be reassigned.',
          type: 'ERROR',
        });
        setClaimStatus({
          message: 'This ticket has been voided and cannot be claimed.',
          type: 'ERROR',
        });
      } else if (
        ticketAssignmentState === 'PENDING' ||
        ticketAssignmentState === 'ACCEPTED'
      ) {
        if (email === ticketAssignmentEmail) {
          setStatus({
            message: `Ticket email is same as new assignee email. Assignment state ${ticketAssignmentState.toLowerCase()}`,
            type: 'ERROR',
          });
          if (hasAutoClaim && ticketAssignmentState === 'PENDING') {
            claimTicket(data.ticket.id);
          } else {
            setClaimStatus({
              message: `Ticket cannot be auto claimed as it has ${ticketAssignmentState.toLowerCase()} state`,
              type: 'ERROR',
            });
          }
        } else {
          setStatus({
            message: `This ticket is already assigned to ${ticketAssignmentEmail}`,
            type: 'ERROR',
          });
          setClaimStatus({
            message: `This ticket is already assigned to ${ticketAssignmentEmail}, cannot be claimed.`,
            type: 'ERROR',
          });
        }
      } else if (newAssignmentUserEmail) {
        setStatus({
          message: `${newAssignmentUserEmail} already owns a ticket for ${
            conferenceSlug as string
          } event therefore reassignment will not be executed.`,
          type: 'ERROR',
        });
        setClaimStatus({
          message: `${newAssignmentUserEmail} already owns a ticket for ${
            conferenceSlug as string
          } event therefore auto claim will not be executed.`,
          type: 'ERROR',
        });
      }
    } else {
      setStatus({
        message:
          'There was an error fetching ticket information, make sure your csv contains all required information or try again later.',
        type: 'ERROR',
      });
    }
  }, [data?.ticket?.id as string, error, newAssignmentUserData]);
  if (loading) return null;

  return (
    <AssigneeItem
      bookingRef={bookingRef}
      claimStatus={hasAutoClaim ? claimStatus : undefined}
      email={email}
      firstName={firstName}
      lastName={lastName}
      status={status}
    />
  );
};

export default AssigneeItemProvider;
