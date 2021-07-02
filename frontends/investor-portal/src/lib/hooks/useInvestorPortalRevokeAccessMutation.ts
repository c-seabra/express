import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

import INVESTOR_PORTAL_REVOKE_ACCESS_MUTATION from '../../operations/mutations/InvestorPortalRevokeAccess';
import ATTENDANCES_LIST from '../../operations/queries/Attendances';
import { UserError } from '../types';

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
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [investorPortalRevokeAccessMutation, { data, error, loading }] =
    useMutation<InvestorPortalRevokeAccessData>(
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

  const context = {
    slug,
    token,
  };

  const investorRevokeMutation = async () => {
    await investorPortalRevokeAccessMutation({
      context,
      refetchQueries: [
        {
          context,
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
