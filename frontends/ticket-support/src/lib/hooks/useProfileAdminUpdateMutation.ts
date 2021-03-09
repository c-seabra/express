import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import ASSIGNMENT_PROFILE_UPDATE from '../../operations/mutations/AssignmentProfileUpdate';
import { Account, UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type AssignmentProfileUpdateData = {
  assignmentProfileAdminUpdate: {
    assignee: Account;
    successMessage: string;
    userErrors: UserError[];
  };
};

type AssignmentProfileAdminUpdateInput = Omit<
  Account,
  | 'email'
  | 'id'
  | 'lastLoginTokenCreatedAt'
  | 'marketingConsent'
  | 'personalisationConsent'
>;

const useProfileAdminUpdateMutation = ({
  accountId,
}: {
  accountId?: string;
}) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();

  const [updateProfileMutation] = useMutation<AssignmentProfileUpdateData>(
    ASSIGNMENT_PROFILE_UPDATE,
    {
      onCompleted: ({ assignmentProfileAdminUpdate }) => {
        if (assignmentProfileAdminUpdate?.successMessage) {
          success(assignmentProfileAdminUpdate?.successMessage);
        } else {
          error(assignmentProfileAdminUpdate?.userErrors[0].message);
        }
      },
      onError: (e) => {
        error(e?.message);
      },
      refetchQueries: ['TicketAuditTrail', 'Ticket'],
    },
  );

  const updateProfile = async (profile: AssignmentProfileAdminUpdateInput) => {
    await updateProfileMutation({
      context: {
        slug: conferenceSlug,
        token,
      },
      variables: {
        profile: {
          ...profile,
          accountId,
        },
      },
    });
  };

  return {
    updateProfile,
  };
};

export default useProfileAdminUpdateMutation;
