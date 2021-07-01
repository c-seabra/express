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
import MAGIC_LINK_GENERATE from '../../operations/mutations/LoginLinkGenerate';
import { UserError } from '../types';

type MagicLinkData = {
  assignmentMagicLinkGenerate: {
    email: string;
    loginLink: string;
    userErrors: UserError[];
  };
};

const useMagicLinkMutation = ({
  assignee,
}: {
  assignee: NonNullable<
    extractTypeFromMaybe<GetQueryResult<TicketQuery, 'ticket'>['assignment']>
  >['assignee'];
}) => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [generateLink, { data, loading, error }] = useMutation<MagicLinkData>(
    MAGIC_LINK_GENERATE,
    {
      onCompleted: ({ assignmentMagicLinkGenerate }) => {
        if (assignmentMagicLinkGenerate?.userErrors[0]) {
          errorMessage(assignmentMagicLinkGenerate?.userErrors[0].message);
        } else {
          success('Link generated');
        }
      },
      onError: (e) => errorMessage(e.message),
    },
  );

  const generateLoginLink = async (reason: string) => {
    if (reason) {
      await generateLink({
        context: {
          headers: {
            'x-reason': reason,
          },
          slug,
          token,
        },
        variables: {
          input: {
            email: assignee?.email,
            eventSlug: slug,
          },
        },
      });
    }
  };

  return {
    data,
    error,
    generateLoginLink,
    loading,
  };
};

export default useMagicLinkMutation;
