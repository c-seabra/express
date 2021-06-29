import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { TicketQuery } from '@websummit/graphql/src/@types/operations';
import {
  extractTypeFromMaybe,
  GetQueryResult,
} from '@websummit/graphql/src/lib/types';

import { useAppContext } from '../../components/app/AppContext';
import ASSIGNMENT_LOGIN_LINK from '../../operations/mutations/AssignmentLoginLinkRequest';
import { UserError } from '../types';

type SendLoginLinkMutationResult = {
  assignmentMagicLinkLoginRequest: {
    userErrors: UserError[];
  };
};

type ExtractedTicketQueryAssigneeResult = NonNullable<
  extractTypeFromMaybe<GetQueryResult<TicketQuery, 'ticket'>['assignment']>
>['assignee'];

const useSendLoginLinkMutation = ({
  assignee,
}: {
  assignee: ExtractedTicketQueryAssigneeResult;
}) => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();

  const [sendLink] = useMutation<SendLoginLinkMutationResult>(
    ASSIGNMENT_LOGIN_LINK,
    {
      onCompleted: ({ assignmentMagicLinkLoginRequest }) => {
        if (assignmentMagicLinkLoginRequest?.userErrors[0]) {
          error(assignmentMagicLinkLoginRequest?.userErrors[0].message);
        } else {
          success('Login link sent');
        }
      },
      onError: (e) => error(e.message),
      refetchQueries: ['TicketAuditTrail', 'Ticket'],
    },
  );

  const sendLoginLink = async (reason: string) => {
    if (reason) {
      await sendLink({
        context: {
          headers: {
            'x-reason': reason,
          },
          slug,
          token,
        },
        variables: {
          email: assignee?.email,
        },
      });
    }
  };

  return {
    sendLoginLink,
  };
};

export default useSendLoginLinkMutation;
