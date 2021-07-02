import 'moment-timezone';

import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';
import moment from 'moment';

import INVESTOR_SESSIONS_CREATE_MUTATION from '../../operations/mutations/InvestorSessionsCreate';
import { UserError } from '../types';

type InvestorSessionsCreateData = {
  investorSessionsCreate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type InvestorSessionsCreatesArgs = {
  count: number | undefined;
  endsAt: string | undefined;
  eventTimezone: string;
  startsAt: string | undefined;
};

const useInvestorSessionCreateMutation = ({
  count,
  endsAt,
  eventTimezone,
  startsAt,
}: InvestorSessionsCreatesArgs) => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return null;
    }
    return moment(dateString).tz(eventTimezone, true).format();
  };

  const [createSesions, { data, error, loading }] =
    useMutation<InvestorSessionsCreateData>(INVESTOR_SESSIONS_CREATE_MUTATION, {
      onCompleted: ({ investorSessionsCreate }) => {
        if (investorSessionsCreate?.userErrors[0]) {
          errorMessage(investorSessionsCreate?.userErrors[0].message);
        } else {
          success(investorSessionsCreate.successMessage);
        }
      },
      onError: (e) => errorMessage(e.message),
    });

  const createSesionsMutation = async () => {
    await createSesions({
      context: {
        slug,
        token,
      },
      refetchQueries: ['EventQuery'],
      variables: {
        investorSessionsCount: count,
        investorSessionsEndsAt: styledDateForMutation(endsAt),
        investorSessionsStartsAt: styledDateForMutation(startsAt),
      },
    });
  };

  return {
    createSesionsMutation,
    data,
    error,
    loading,
  };
};

export default useInvestorSessionCreateMutation;
