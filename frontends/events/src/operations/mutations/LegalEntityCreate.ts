import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  LegalEntityCreateInput,
  useLegalEntityCreateMutation,
} from '@websummit/graphql/src/@types/operations';

import { useAppContext } from '../../components/app/AppContext';

export type LegalEntityCreateRequest = {
  input: LegalEntityCreateInput;
  refetch?: any;
};

export const useLegalEntityCreateOperation = () => {
  const { token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();

  const [createLegalEntityMutation] = useLegalEntityCreateMutation({
    context: { token },
    onCompleted: ({ legalEntityCreate }) => {
      if (
        legalEntityCreate?.userErrors &&
        legalEntityCreate?.userErrors.length > 0
      ) {
        errSnackbar(legalEntityCreate?.userErrors[0].message);
      } else {
        snackbar(`Legal entity created`);
      }
    },
    onError: (e) => errSnackbar(e.message),
  });

  const createLegalEntity = async ({ input }: LegalEntityCreateRequest) => {
    await createLegalEntityMutation({
      awaitRefetchQueries: true,
      context: {
        token,
      },
      refetchQueries: ['Event'],
      variables: {
        input,
      },
    });

    // Hacky solution because refetchQueries is not working
    // setTimeout(() => {
    //   return refetch();
    // }, 500);
  };

  return {
    createLegalEntity,
  };
};
