import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  TaxRateUpdateInput,
  useTaxRateUpdateMutation,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';

export type TaxRateUpdateRequest = {
  input: TaxRateUpdateInput;
  refetch?: any;
};

export const useTaxRateUpdateOperation = () => {
  const { slug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [taxRateUpdateMutation] = useTaxRateUpdateMutation({
    onCompleted: ({ taxRateUpdate }) => {
      if (taxRateUpdate?.userErrors && taxRateUpdate?.userErrors.length > 0) {
        errSnackbar(taxRateUpdate?.userErrors[0].message);
      } else {
        snackbar('Tax rate updated');
      }
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
        input,
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
