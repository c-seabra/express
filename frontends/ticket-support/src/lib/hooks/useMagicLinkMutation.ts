import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import MAGIC_LINK_GENERATE from '../../operations/mutations/LoginLinkGenerate';
import { Account, UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type MagicLinkData = {
  assignmentMagicLinkGenerate: {
    email: string;
    loginLink: string;
    userErrors: UserError[];
  };
};

const useMagicLinkMutation = ({ assignee }: { assignee: Account }) => {
  const { conferenceSlug, token } = useAppContext();
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
          slug: conferenceSlug,
          token,
        },
        variables: {
          input: {
            email: assignee.email,
            eventSlug: conferenceSlug,
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
