import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  TaxRateCreateInput,
  useTaxRateCreateMutation,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';

export type TaxRateCreateRequest = {
  input: TaxRateCreateInput;
  refetch?: any;
};

export const useTaxRateCreateOperation = () => {
  const { slug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [taxRateCreateMutation] = useTaxRateCreateMutation({
    onCompleted: ({ taxRateCreate }) => {
      if (taxRateCreate?.userErrors && taxRateCreate?.userErrors.length > 0) {
        errSnackbar(taxRateCreate?.userErrors[0].message);
      } else {
        snackbar('Tax rate added');
      }
    },
    onError: (e) => errSnackbar(e.message),
  });

  const taxRateCreate = async ({ input, refetch }: TaxRateCreateRequest) => {
    await taxRateCreateMutation({
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
    taxRateCreate,
  };
};
