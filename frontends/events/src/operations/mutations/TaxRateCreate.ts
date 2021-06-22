import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceTaxCreate,
  useCommerceCreateTaxMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_LIST_TAXES from '@websummit/graphql/src/operations/queries/CommerceListTaxes';

import { useRequestContext } from '../../components/app/AppContext';

export type TaxRateCreateRequest = {
  input: CommerceTaxCreate;
};

export const useTaxRateCreateOperation = () => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [taxRateCreateMutation] = useCommerceCreateTaxMutation({
    onCompleted: () => {
      snackbar('Tax rate added');
    },
    onError: (e) => errSnackbar(e.message),
  });

  const taxRateCreate = async ({ input }: TaxRateCreateRequest) => {
    await taxRateCreateMutation({
      awaitRefetchQueries: true,
      context,
      refetchQueries: [{ context, query: COMMERCE_LIST_TAXES }],
      variables: {
        commerceTaxCreate: input,
      },
    });
  };

  return {
    taxRateCreate,
  };
};
