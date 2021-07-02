import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  LegalEntityCreateInput,
  useLegalEntityCreateMutation,
} from '@websummit/graphql/src/@types/operations';
import LEGAL_ENTITY_LIST from '@websummit/graphql/src/operations/queries/LegalEntityList';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

export type LegalEntityCreateRequest = {
  input: LegalEntityCreateInput;
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
    refetchQueries: [{ context: { token }, query: LEGAL_ENTITY_LIST }],
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
  };

  return {
    createLegalEntity,
  };
};
