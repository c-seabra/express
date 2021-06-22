import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceTaxUpdate,
  useCommerceUpdateTaxMutation,
} from '@websummit/graphql/src/@types/operations';

import { useRequestContext } from '../../components/app/AppContext';

export type TaxRateUpdateRequest = {
  input: CommerceTaxUpdate;
  refetch?: any;
};

export const useTaxRateUpdateOperation = () => {
  const context = useRequestContext();
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
      context,
      refetchQueries: ['Event', 'EventListQuery'],
      variables: {
        commerceTaxUpdate: input,
        id: input?.id || 'null',
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
