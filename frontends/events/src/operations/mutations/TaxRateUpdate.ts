import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceTaxUpdate,
  useCommerceUpdateTaxMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_LIST_TAXES from '@websummit/graphql/src/operations/queries/CommerceListTaxes';

import { useRequestContext } from '../../components/app/AppContext';

export type TaxRateUpdateRequest = {
  input: CommerceTaxUpdate;
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

  const taxRateUpdate = async ({ input }: TaxRateUpdateRequest) => {
    await taxRateUpdateMutation({
      awaitRefetchQueries: true,
      context,
      refetchQueries: [{ context, query: COMMERCE_LIST_TAXES }],
      variables: {
        commerceTaxUpdate: input,
        id: input?.id || 'null',
      },
    });
  };

  return {
    taxRateUpdate,
  };
};
