import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceTaxUpdate,
  useCommerceUpdateTaxMutation,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';

export type TaxRateUpdateRequest = {
  input: CommerceTaxUpdate;
  refetch?: any;
};

export const useTaxRateUpdateOperation = () => {
  const { slug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [taxRateUpdateMutation] = useCommerceUpdateTaxMutation({
    onCompleted: () => {
      snackbar('Tax rate updated');
    },
    onError: (e) => errSnackbar(e.message),
  });

  const taxRateUpdate = async ({ input, refetch }: TaxRateUpdateRequest) => {
    await taxRateUpdateMutation({
      awaitRefetchQueries: true,
      context: {
        slug,
        token,
      },
      refetchQueries: ['Event', 'EventListQuery'],
      variables: {
        commerceTaxUpdate: input,
        id: input?.id || 'null'
      },
    });

    // Hacky solution because refetchQueries is not working
    setTimeout(() => {
      return refetch();
    }, 1000);
  };

  return {
    taxRateUpdate,
  };
};
