import 'moment-timezone';

import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import moment from 'moment';

import { useAppContext } from '../../components/app/AppContext';
import INVESTOR_MEETING_CONFIGURATION_UPDATE from '../../operations/mutations/InvestorMeetingConfigurationUpdate';
import { UserError } from '../types';

type InvestorMeetingConfigurationUpdateData = {
  investorMeetingConfigurationUpdate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type InvestorMeetingsArgs = {
  defaultStartupSelections: number | undefined;
  eventTimezone: string;
  meetingsPerSession: number | undefined;
  sessionDuration: number | undefined;
  sponsorLogo: string | undefined;
  startupPortalClosingAt: string | undefined;
  startupPortalOpeningAt: string | undefined;
  startupSelectionDeadline: string | undefined;
};

const useInvestorMeetingConfigurationUpdateMutation = ({
  eventTimezone,
  defaultStartupSelections,
  meetingsPerSession,
  sessionDuration,
  sponsorLogo,
  startupPortalClosingAt,
  startupPortalOpeningAt,
  startupSelectionDeadline,
}: InvestorMeetingsArgs) => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return null;
    }
    return moment(dateString).tz(eventTimezone, true).format();
  };

  const [updateInvestorMeetingConfiguration, { data, error, loading }] =
    useMutation<InvestorMeetingConfigurationUpdateData>(
      INVESTOR_MEETING_CONFIGURATION_UPDATE,
      {
        onCompleted: ({ investorMeetingConfigurationUpdate }) => {
          if (investorMeetingConfigurationUpdate?.userErrors[0]) {
            errorMessage(
              investorMeetingConfigurationUpdate?.userErrors[0].message,
            );
          } else {
            success(investorMeetingConfigurationUpdate.successMessage);
          }
        },
        onError: (e) => errorMessage(e.message),
      },
    );

  const investorMeetingConfigurationUpdateMutation = async () => {
    await updateInvestorMeetingConfiguration({
      context: {
        slug,
        token,
      },
      refetchQueries: ['EventQuery'],
      variables: {
        investorMeetingsDefaultStartupSelections: defaultStartupSelections,
        investorMeetingsMeetingsPerSession: meetingsPerSession,
        investorMeetingsSessionDuration: sessionDuration,
        investorMeetingsSponsorLogo: sponsorLogo,
        investorMeetingsStartupPortalClosingAt: styledDateForMutation(
          startupPortalClosingAt,
        ),
        investorMeetingsStartupPortalOpeningAt: styledDateForMutation(
          startupPortalOpeningAt,
        ),
        investorMeetingsStartupSelectionDeadline: styledDateForMutation(
          startupSelectionDeadline,
        ),
      },
    });
  };

  return {
    data,
    error,
    investorMeetingConfigurationUpdateMutation,
    loading,
  };
};

export default useInvestorMeetingConfigurationUpdateMutation;
