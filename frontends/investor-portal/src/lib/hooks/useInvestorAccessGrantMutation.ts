import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
  useWarningSnackbar,
} from '@websummit/components/src/molecules/Snackbar';

import { useAppContext } from '../../components/app/AppContext';
import { INVESTOR_ACCESS_GRANT_MUTATION } from '../../operations/mutations/InvestorAccessGrantMutation';
import { Attendance, Error } from '../types';

type InvestorAccessGrantData = {
  investorAccessGrant: {
    attendances: Attendance[];
    errors: Error[];
    invalidBookingReferences: string[];
    successMessage: string;
  };
};

type InvestorAccessArgs = {
  bookingReferences: string[];
  setAttendances: (arg: Attendance[]) => void;
  setInvalidBookingReferences: (arg: string[]) => void;
  setUpdating: (arg: boolean) => void;
  startupSelectionsCount: number | undefined;
};

const useInvestorAccessGrantMutation = ({
  bookingReferences,
  setInvalidBookingReferences,
  setAttendances,
  setUpdating,
  startupSelectionsCount,
}: InvestorAccessArgs) => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const warning = useWarningSnackbar();
  const errorMessage = useErrorSnackbar();

  const [
    grantInvestorAccess,
    { data, error, loading },
  ] = useMutation<InvestorAccessGrantData>(INVESTOR_ACCESS_GRANT_MUTATION, {
    onCompleted: ({ investorAccessGrant }) => {
      setUpdating(false);
      if (investorAccessGrant?.errors[0]) {
        setInvalidBookingReferences([]);
        setAttendances([]);
        errorMessage(investorAccessGrant?.errors[0].message);
      } else {
        setInvalidBookingReferences(
          investorAccessGrant?.invalidBookingReferences,
        );
        setAttendances(investorAccessGrant?.attendances);
        if (investorAccessGrant?.invalidBookingReferences[0]) {
          warning(investorAccessGrant.successMessage);
        } else {
          success(investorAccessGrant.successMessage);
        }
      }
    },
    onError: (e) => {
      setInvalidBookingReferences([]);
      setAttendances([]);
      setUpdating(false);
      errorMessage(e.message);
    },
  });

  const grantInvestorAccessMutation = async () => {
    await grantInvestorAccess({
      context: {
        slug,
        token,
      },
      refetchQueries: ['EventQuery'],
      variables: {
        bookingReferences,
        startupSelectionsCount,
      },
    });
  };

  return {
    data,
    error,
    grantInvestorAccessMutation,
    loading,
  };
};

export default useInvestorAccessGrantMutation;
