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
  const { conferenceSlug, token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [taxRateCreateMutation] = useTaxRateCreateMutation({
    onCompleted: () => {
      snackbar('Tax rate added');
    },
    onError: (e) => errSnackbar(e.message),
  });

  const taxRateCreate = async ({ input, refetch }: TaxRateCreateRequest) => {
    await taxRateCreateMutation({
      context: {
        // headers: {
        //   'X-Reason': reason,
        // },
        slug: conferenceSlug,
        token,
      },
      variables: {
        input,
      },
    });

    // Hacky solution
    // there is a race condition after successful mutation order gets null
    // setTimeout(() => refetch(), 1000);
  };

  return {
    taxRateCreate,
  };
};
