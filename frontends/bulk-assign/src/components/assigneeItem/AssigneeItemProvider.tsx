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
      ticketAcceptData,
    }: {
      ticketAcceptData: {
        userErrors: [{ message: string }];
      };
    }) => {
      if (ticketAcceptData?.userErrors.length) {
        setClaimStatus({
          message: ticketAcceptData.userErrors[0].message,
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
    onCompleted: (ticketData) => {
      if (!ticketData?.ticket?.id) {
        setStatus({
          message: `Cannot find Ticket ID for - ${bookingRef}. Your role might not be sufficient for this action.`,
          type: 'ERROR',
        });
        setClaimStatus({
          message: 'Ticket ID is missing and can not auto claim',
          type: 'ERROR',
        });
      }
      if (ticketData?.ticket?.userErrors?.length) {
        setStatus({
          message: ticketData?.ticket?.userErrors?.[0]?.message,
          type: 'ERROR',
        });
        setClaimStatus({
          message: `${ticketData?.ticket?.userErrors?.[0]?.message} - and can not auto claim`,
          type: 'ERROR',
        });
      }
    },
    variables: {
      reference: bookingRef,
    },
  });

  const [ticketAssign] = useMutation(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({
      ticketAssignData,
    }: {
      ticketAssignData: {
        ticket: {
          assignment: {
            assignee: Assignee;
            state: 'PENDING' | 'ACCEPTED' | 'REJECTED';
          };
        };
        userErrors: [{ message: string }];
      };
    }) => {
      if (ticketAssignData?.ticket?.assignment?.assignee) {
        setStatus({
          message: 'Assignment has been successful',
          type: 'SUCCESS',
        });
        if (hasAutoClaim && data?.ticket?.id) claimTicket(data?.ticket?.id);
      }
      if (ticketAssignData?.userErrors.length) {
        setStatus({
          message: ticketAssignData.userErrors[0].message,
          type: 'ERROR',
        });
        setClaimStatus({
          message: `${ticketAssignData.userErrors[0].message} - and can not auto claim`,
          type: 'ERROR',
        });
      }
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
    // todo: this whole setup is a horrible hack tbh
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.ticket?.id, error, newAssignmentUserData]);
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
