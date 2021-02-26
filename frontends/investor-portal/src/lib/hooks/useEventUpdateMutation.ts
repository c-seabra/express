import 'moment-timezone';

import { useMutation } from '@apollo/client';
import moment from 'moment';

import { useAppContext } from '../../components/app/AppContext';
import INVESTOR_MEETING_CONFIGURATION_UPDATE from '../../operations/mutations/InvestorMeetingConfigurationUpdate';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type EventUpdateData = {
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

const useEventUpdateMutation = ({
  eventTimezone,
  defaultStartupSelections,
  meetingsPerSession,
  sessionDuration,
  sponsorLogo,
  startupPortalClosingAt,
  startupPortalOpeningAt,
  startupSelectionDeadline,
}: InvestorMeetingsArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return null;
    }
    return moment(dateString).tz(eventTimezone, true).format();
  };

  const [updateEvent, { data, error, loading }] = useMutation<EventUpdateData>(
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

  const updateEventMutation = async () => {
    await updateEvent({
      context: {
        slug: conferenceSlug,
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
    loading,
    updateEventMutation,
  };
};

export default useEventUpdateMutation;
