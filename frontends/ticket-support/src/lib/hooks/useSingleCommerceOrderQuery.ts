import {
  CommerceOrder,
  useCommerceGetOrderQuery,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import { useErrorSnackbar } from './useSnackbarMessage';

const useSingleCommerceOrderQuery = ({ id = '' }: { id?: string }) => {
  const { conferenceSlug, token } = useAppContext();
  const error = useErrorSnackbar();

  const { data, loading, error: commerceOrderError } = useCommerceGetOrderQuery(
    {
      context: {
        slug: conferenceSlug,
        token,
      },
      onError: (e) =>
        error(`Cannot fetch details for order refund. Reason - ${e.message}`),
      skip: !id,
      variables: {
        id,
      },
    },
  );

  return {
    commerceOrder: data?.commerceGetOrder as CommerceOrder,
    commerceOrderError,
    loadingCommerceOrder: loading,
  };
};

export default useSingleCommerceOrderQuery;
