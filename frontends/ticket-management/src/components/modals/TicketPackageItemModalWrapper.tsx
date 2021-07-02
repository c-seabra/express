import FormikModal from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceProductType,
  useCommerceCreatePackagedProductMutation,
  useCommerceListProductsQuery,
  useCommerceUpdatePackagedProductMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_GET_PRODUCT from '@websummit/graphql/src/operations/queries/CommerceGetProduct';
import STATIC_MESSAGES from '@websummit/tsutils/src/lib/constants/messages';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
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

const TicketPackageItemModalWrapper = ({
  isOpen,
  closeModal,
  prefillData,
  productId,
}: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const refetchQueriesContext = [
    {
      context,
      query: COMMERCE_GET_PRODUCT,
      variables: { id: productId },
    },
  ];

  const { data, loading } = useCommerceListProductsQuery({
    context,
    fetchPolicy: 'network-only',
    onError: (e) => errorSnackbar(e.message),
  });

  const emptyOption = {
    label: loading ? 'Loading ticket types...' : 'Please select',
    value: undefined,
  };

  const getTicketTypesOptions = (types: any[] = []) => [
    emptyOption,
    ...types.map((type) => ({ label: type?.name, value: type?.id })),
  ];

  const editOn = prefillData && prefillData?.id;
  const products = data?.commerceListProducts?.hits;
  const productsWithoutPackages = products?.filter((element: any) => {
    return element.type === CommerceProductType.Simple;
  });
  const sortedProductsWithoutPackages = productsWithoutPackages?.sort(
    (a, b) => {
      return a.name.localeCompare(b.name);
    },
  );
  const productOptions = getTicketTypesOptions(
    sortedProductsWithoutPackages as [],
  );

  const [createTicketPackageItem] = useCommerceCreatePackagedProductMutation({
    context,
    onCompleted: () => {
      snackbar('Ticket type added to package');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });
  const [updateTicketPackageItem] = useCommerceUpdatePackagedProductMutation({
    context,
    onCompleted: () => {
      snackbar('Ticket type updated in package');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
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
    let mutation;
    const createInput = {
      packagedProduct: formData.product,
      quantity: formData.quantity,
    };

    const updateInput = {
      id: productId,
      ...createInput,
    };

    if (!formData.id) {
      mutation = createTicketPackageItem({
        variables: {
          commercePackagedProductCreate: createInput,
          productId,
        },
      });
    }

    if (formData.id) {
      mutation = updateTicketPackageItem({
        variables: {
          commercePackagedProductUpdate: {
            id: formData.id,
            packagedProduct: formData.product,
            quantity: updateInput.quantity,
          },
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
      alertHeader={
        editOn ? 'Edit ticket type in package' : 'Add ticket type to package'
      }
      closeModal={closeModal}
      customForm={(props: any) => (
        <TicketPackageItemForm
          closeModal={closeModal}
          isListLoading={loading}
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
