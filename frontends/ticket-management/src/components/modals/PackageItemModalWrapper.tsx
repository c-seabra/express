import FormikModal from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceDealItemType,
  useCommerceCreateDealItemMutation,
  useCommerceListProductsQuery,
  useCommerceUpdateDealItemMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_DEAL_ITEMS_LIST from '@websummit/graphql/src/operations/queries/CommerceListDealItems';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import STATIC_MESSAGES from '@websummit/tsutils/src/lib/constants/messages';
import { switchCase } from '@websummit/tsutils/src/lib/utils/logic';
import { fromCents, toCents } from '@websummit/tsutils/src/lib/utils/price';
import React from 'react';
import * as Yup from 'yup';

import PackageItemForm from '../organisms/PackageItemForm';

type ModalProps = {
  closeModal: () => void;
  currencySymbol: string;
  dealId: string;
  isOpen: boolean;
  prefillData?: any;
};

export type PackageItemFormData = {
  amount: number;
  id: string;
  max: number;
  min: number;
  name: string;
  product: string;
  step: number;
  type?: CommerceDealItemType;
};

const validationSchema = Yup.object().shape({
  amount: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  max: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  min: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  product: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  step: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  type: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const emptyOption = {
  label: 'Please select',
  value: undefined,
};

const typesOptions = [
  { id: CommerceDealItemType.PercentageDiscount, name: 'Percentage discount' },
  { id: CommerceDealItemType.AbsoluteDiscount, name: 'Absolute discount' },
  { id: CommerceDealItemType.AbsolutePrice, name: 'Absolute price' },
];
const getTicketTypesOptions = (types: any[] = []) => [
  emptyOption,
  ...types.map((type) => ({ label: type?.name, value: type?.id })),
];

const getPriceOptions = (prices: any[] = []) => [
  emptyOption,
  ...prices.map((price) => ({ label: price?.name, value: price?.id })),
];

const PackageItemModalWrapper = ({
  isOpen,
  closeModal,
  prefillData,
  dealId,
  currencySymbol,
}: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const refetchQueriesContext = [
    {
      context,
      query: COMMERCE_DEAL_ITEMS_LIST,
      variables: { dealId },
    },
  ];
  const { data } = useCommerceListProductsQuery({
    context,
    fetchPolicy: 'network-only',
    onError: (e) => errorSnackbar(e.message),
  });
  const editOn = prefillData && prefillData.product; // product id exists
  const products = data?.commerceListProducts?.hits;
  const productOptions = getTicketTypesOptions(products as []);
  const priceTypeOptions = getPriceOptions(typesOptions);
  const [createPackageItem] = useCommerceCreateDealItemMutation({
    context,
    onCompleted: () => {
      snackbar('Pricing for deal detail added');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });
  const [updatePackageItem] = useCommerceUpdateDealItemMutation({
    context,
    onCompleted: () => {
      snackbar('Pricing for deal detail updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });

  const setAmountToBackend = (amount: any, source: any): any =>
    switchCase({
      [CommerceDealItemType.PercentageDiscount]: amount,
      [CommerceDealItemType.AbsoluteDiscount]: toCents(amount),
      [CommerceDealItemType.AbsolutePrice]: toCents(amount),
    })(1)(source);

  const setAmountFromBackend = (amount: any, source: any): any =>
    switchCase({
      [CommerceDealItemType.PercentageDiscount]: amount,
      [CommerceDealItemType.AbsoluteDiscount]: fromCents(amount),
      [CommerceDealItemType.AbsolutePrice]: fromCents(amount),
    })(1)(source);

  const initialValues = (editMode: boolean) => {
    let values: PackageItemFormData = {
      amount: 1,
      id: '',
      max: 999, // TODO fix to undefined / empty value?
      min: 1,
      name: '',
      product: '',
      step: 1,
      type: undefined,
    };

    if (editMode) {
      values = {
        amount: setAmountFromBackend(prefillData.amount, prefillData.type),
        id: prefillData.id,
        max: prefillData.max,
        min: prefillData.min,
        name: prefillData?.name,
        product: prefillData.product,
        step: prefillData.step,
        type: prefillData.type,
      };
    }

    return values;
  };

  const pickMutation = (editMode: boolean, formData: any) => {
    // TODO fix type
    let mutation;
    const createInput = {
      amount: setAmountToBackend(formData.amount, formData.type),
      max: Number(formData.max),
      min: Number(formData.min),
      name: formData.name,
      product: formData.product,
      step: Number(formData.step),
      type: formData.type,
    };

    const updateInput = {
      id: formData.id,
      ...createInput,
    };

    if (!editMode) {
      mutation = createPackageItem({
        variables: {
          commerceDealItemCreate: createInput,
          dealId,
        },
      });
    }

    if (editMode) {
      mutation = updatePackageItem({
        variables: {
          commerceDealItemUpdate: updateInput,
          dealId,
          id: formData.id,
        },
      });
    }

    return mutation;
  };

  const setMutation = (formData: PackageItemFormData) => {
    return pickMutation(editOn, formData);
  };

  return (
    <FormikModal
      alertHeader="Add ticket type to deal"
      closeModal={closeModal}
      customForm={(props: any) => (
        <PackageItemForm
          closeModal={closeModal}
          currencySymbol={currencySymbol}
          priceTypeOptions={priceTypeOptions}
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
      initialValues={initialValues(editOn)}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={editOn ? 'Save' : 'Create'}
      validationSchema={validationSchema}
    />
  );
};

export default PackageItemModalWrapper;
