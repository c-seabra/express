import {
  CommerceOrder,
  useCommerceGetOrderQuery,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';
import { useErrorSnackbar } from './useSnackbarMessage';

const useSingleCommerceOrderQuery = ({ id = '' }: { id?: string }) => {
  const { conferenceSlug, token } = useAppContext();
  const error = useErrorSnackbar();

  const { data, loading } = useCommerceGetOrderQuery({
    context: {
      slug: conferenceSlug,
      token,
    },
    onError: (e) =>
      error(`Cannot fetch details for order refund. Reason - ${e.message}`),
    skip: !id,
    variables: {
      id,
      storeId: '7ada51b5-eed4-44f9-852c-9ef5b20e16a1',
    },
  });

  return {
    commerceOrder: data?.commerceGetOrder as CommerceOrder,
    loading,
  };
};

export default useSingleCommerceOrderQuery;
