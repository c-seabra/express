import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import INVESTOR_PORTAL_REVOKE_ACCESS_MUTATION from '../../operations/mutations/InvestorPortalRevokeAccess';
import ATTENDANCES_LIST from '../../operations/queries/Attendances';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type InvestorPortalRevokeAccessData = {
  investorPortalRevokeAccess: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type investorPortalRevokeAccesssArgs = {
  attendanceId: string;
};

const useInvestorPortalRevokeAccessMutation = ({
  attendanceId,
}: investorPortalRevokeAccesssArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [
    investorPortalRevokeAccessMutation,
    { data, error, loading },
  ] = useMutation<InvestorPortalRevokeAccessData>(
    INVESTOR_PORTAL_REVOKE_ACCESS_MUTATION,
    {
      onCompleted: ({ investorPortalRevokeAccess }) => {
        if (investorPortalRevokeAccess?.userErrors[0]) {
          errorMessage(investorPortalRevokeAccess?.userErrors[0].message);
        } else {
          success(investorPortalRevokeAccess.successMessage);
        }
      },
      onError: (e) => errorMessage(e.message),
    },
  );

  const investorRevokeMutation = async () => {
    await investorPortalRevokeAccessMutation({
      context: {
        slug: conferenceSlug,
        token,
      },
      refetchQueries: [
        {
          context: {
            slug: conferenceSlug,
            token,
          },
          query: ATTENDANCES_LIST,
          variables: {
            after: '',
            filter: { type: 'INVESTOR' },
            first: 25,
          },
        },
      ],
      variables: {
        attendanceId,
      },
    });
  };

  return {
    data,
    error,
    investorRevokeMutation,
    loading,
  };
};

export default useInvestorPortalRevokeAccessMutation;
