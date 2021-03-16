import {
    useErrorSnackbar,
    useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
    useUpdateCommerceOrderMutation,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';

export type TaxRateCreateRequest = {
    id: string;
    reason: string;
    refetch?: any;
};

export const useTaxRateCreateOperation = () => {
    const { conferenceSlug, token } = useAppContext();
    const snackbar = useSuccessSnackbar();
    const errSnackbar = useErrorSnackbar();

    const [taxRateCreateMutation] = useUpdateCommerceOrderMutation({
        onCompleted: () => {
            snackbar('Tax rate added');
        },
        onError: (e) => errSnackbar(e.message),
    });

    const taxRateCreate = async ({
      refetch,
    }: TaxRateCreateRequest) => {
      await taxRateCreateMutation({
        context: {
          // headers: {
          //   'X-Reason': reason,
          // },
          slug: conferenceSlug,
          token,
        },
        // variables: {
        // },
      });

      // Hacky solution
      // there is a race condition after successful mutation order gets null
      // setTimeout(() => refetch(), 1000);
    };

    return {
        taxRateCreate,
    };
};
