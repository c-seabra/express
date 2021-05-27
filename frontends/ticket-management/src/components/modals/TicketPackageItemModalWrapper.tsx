import FormikModal from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  useCommerceCreatePackagedProductMutation,
  useCommerceListProductsQuery,
  useCommerceUpdatePackagedProductMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_DEAL_ITEMS_LIST from '@websummit/graphql/src/operations/queries/CommerceListDealItems';
import React from 'react';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useRequestContext } from '../app/AppContext';
import TicketPackageItemForm from '../organisms/TicketPackageItemForm';

type ModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  prefillData?: any;
  productId: string;
};

export type TicketPackageItemFormData = {
  id?: string;
  product: string;
  quantity: number;
};

const validationSchema = Yup.object().shape({
  product: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  quantity: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const emptyOption = {
  label: 'Please select',
  value: undefined,
};

const getTicketTypesOptions = (types: any[] = []) => [
  emptyOption,
  ...types.map((type) => ({ label: type?.name, value: type?.id })),
];

const TicketPackageItemModalWrapper = ({
  isOpen,
  closeModal,
  prefillData,
  productId,
}: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  // const refetchQueriesContext = [
  //   {
  //     context,
  //     query: COMMERCE_DEAL_ITEMS_LIST,
  //     variables: { productId },
  //   },
  // ];
  const { data } = useCommerceListProductsQuery({
    context,
    fetchPolicy: 'network-only',
    onError: (e) => errorSnackbar(e.message),
  });
  const editOn = prefillData && prefillData?.id; // product id exists
  const products = data?.commerceListProducts?.hits;
  const productOptions = getTicketTypesOptions(products as []);
  const [createTicketPackageItem] = useCommerceCreatePackagedProductMutation({
    context,
    onCompleted: () => {
      snackbar('Ticket type added to package');
    },
    onError: (e) => errorSnackbar(e.message),
    // refetchQueries: refetchQueriesContext,
  });
  const [updateTicketPackageItem] = useCommerceUpdatePackagedProductMutation({
    context,
    onCompleted: () => {
      snackbar('Ticket type updated in package');
    },
    onError: (e) => errorSnackbar(e.message),
    // refetchQueries: refetchQueriesContext,
  });

  const initialValues = () => {
    let values: TicketPackageItemFormData = {
      product: '',
      quantity: 1,
    };

    if (prefillData.id) {
      values = {
        id: prefillData.id,
        product: prefillData.product,
        quantity: prefillData.quantity,
      };
    }

    return values;
  };

  const pickMutation = (formData: any) => {
    console.log('pickMutation', formData);
    let mutation;
    const createInput = {
      product: formData.product,
      quantity: formData.quantity,
    };

    const updateInput = {
      id: formData.id,
      ...createInput,
    };

    if (!formData.id) {
      mutation = createTicketPackageItem({
        variables: {
          commercePackagedProductCreate: {
            packagedProduct: '',
            quantity: createInput.quantity,
          },
          productId,
        },
      });
    }

    if (formData.id) {
      mutation = updateTicketPackageItem({
        variables: {
          commercePackagedProductUpdate: updateInput,
          id: formData.id,
          productId,
        },
      });
    }

    return mutation;
  };

  const setMutation = (formData: TicketPackageItemFormData) => {
    return pickMutation(formData);
  };

  return (
    <FormikModal
      alertHeader="Add ticket type to package"
      closeModal={closeModal}
      customForm={(props: any) => (
        <TicketPackageItemForm
          closeModal={closeModal}
          productOptions={productOptions}
          selectedProductName={
            productOptions?.find(
              (option) => option.value === props?.values?.product,
            )?.label
          }
          submitText={editOn ? 'Save' : 'Create'}
          {...props}
        />
      )}
      initialValues={initialValues()}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={editOn ? 'Save' : 'Create'}
      validationSchema={validationSchema}
    />
  );
};

export default TicketPackageItemModalWrapper;
