import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceOrder,
  useCommerceGetOrderQuery,
} from '@websummit/graphql/src/@types/operations';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

const useSingleCommerceOrderQuery = ({ id = '' }: { id?: string }) => {
  const { slug, token } = useAppContext();
  const error = useErrorSnackbar();

  const {
    data,
    loading,
    error: commerceOrderError,
    refetch,
  } = useCommerceGetOrderQuery({
    context: {
      slug,
      token,
    },
    onError: (e) =>
      error(`Cannot fetch details for order refund. Reason - ${e.message}`),
    skip: !id,
    variables: {
      id,
    },
  });

  return {
    commerceOrder: data?.commerceGetOrder as CommerceOrder,
    commerceOrderError,
    loadingCommerceOrder: loading,
    refetch,
  };
};

export default useSingleCommerceOrderQuery;
