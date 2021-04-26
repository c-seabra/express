import FormikModal, {
  FieldWrapper,
} from '@websummit/components/src/molecules/FormikModal';
import MoneyInputField from '@websummit/components/src/molecules/MoneyInputField';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceDealItemType,
  useCommerceCreateDealItemMutation,
  useCommerceListProductsQuery,
  useCommerceUpdateDealItemMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_DEAL_ITEMS_LIST from '@websummit/graphql/src/operations/queries/CommerceListDealItems';
import { Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useRequestContext } from '../app/AppContext';

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
      snackbar('Pricing for sale cycle added');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });
  const [updatePackageItem] = useCommerceUpdateDealItemMutation({
    context,
    onCompleted: () => {
      snackbar('Pricing for sale cycle updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });

  const initialValues = (editMode: boolean) => {
    let values: PackageItemFormData = {
      amount: 1,
      id: '',
      max: 999, // TODO fix to undefined / empty value?
      min: 1,
      product: '',
      step: 1,
      type: undefined,
    };

    if (editMode) {
      values = {
        amount: prefillData.amount,
        id: prefillData.id,
        max: prefillData.max,
        min: prefillData.min,
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
      amount: Number(formData.amount),
      max: Number(formData.max),
      min: Number(formData.min),
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
      alertHeader={
        editOn ? 'Edit package constraint' : 'Add new package constraint'
      }
      closeModal={closeModal}
      initialValues={initialValues(editOn)}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={editOn ? 'Save' : 'Create'}
      validationSchema={validationSchema}
    >
      <Spacing top="8px">
        <FieldWrapper>
          <SelectField
            required
            label="Ticket type"
            name="product"
            options={productOptions}
          />
        </FieldWrapper>

        <FieldWrapper>
          <InlineWrapper>
            <TextInputField
              required
              label="Min ticket qty."
              min={1}
              name="min"
              step={1}
              type="number"
            />
            <TextInputField
              required
              label="Max ticket qty."
              min={1}
              name="max"
              step={1}
              type="number"
            />
            <TextInputField
              required
              label="Step sale"
              min={1}
              name="step"
              step={1}
              type="number"
            />
          </InlineWrapper>
        </FieldWrapper>

        <FieldWrapper>
          <MoneyInputField
            required
            currencySymbol={currencySymbol}
            label="Amount"
            name="amount"
          />
        </FieldWrapper>

        <FieldWrapper>
          <Spacing bottom="8px">
            <SelectField
              required
              label="Pricing applied"
              name="type"
              options={priceTypeOptions}
            />
          </Spacing>
        </FieldWrapper>
      </Spacing>
    </FormikModal>
  );
};

export default PackageItemModalWrapper;
