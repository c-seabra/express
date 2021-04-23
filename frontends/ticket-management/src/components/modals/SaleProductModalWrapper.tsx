import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import FormikModal, {
  FieldWrapper,
} from '@websummit/components/src/molecules/FormikModal';
import MoneyInputField from '@websummit/components/src/molecules/MoneyInputField';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { fromCents, toCents } from '@websummit/glue/src/lib/utils/price';
import {
  CommerceSaleProductType,
  useCommerceListProductsQuery,
  useCommerceSaleProductCreateMutation,
  useCommerceUpdateSaleProductMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_SALE_PRODUCTS_LIST from '@websummit/graphql/src/operations/queries/CommerceListSaleProducts';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useRequestContext } from '../app/AppContext';

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CenteredVertically = styled.div`
  display: flex;
  align-items: center;
`;

type ModalProps = {
  closeModal: () => void;
  currencySymbol: string;
  existingProducts: any;
  isOpen: boolean;
  prefillData?: any;
  saleId: string;
};

export type SaleProductFormData = {
  active: boolean;
  amount?: number;
  description: string;
  id: string;
  name: string;
  product: string; // ID
  type: any; // Price type
};

const validationSchema = Yup.object().shape({
  active: Yup.boolean(),
  amount: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  description: Yup.string(),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  product: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  type: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const emptyOption = {
  label: 'Please select',
  value: undefined,
};

const typesOptions = [
  { id: CommerceSaleProductType.AbsolutePrice, name: 'Absolute price' },
];
const getTicketTypesOptions = (types: any[] = []) => [
  emptyOption,
  ...types.map((type) => ({ label: type?.name, value: type?.id })),
];

const getPriceOptions = (prices: any[] = []) => [
  emptyOption,
  ...prices.map((price) => ({ label: price?.name, value: price?.id })),
];

const SaleProductModalWrapper = ({
  isOpen,
  closeModal,
  prefillData,
  saleId,
  currencySymbol,
  existingProducts,
}: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const refetchQueriesContext = [
    {
      context,
      query: COMMERCE_SALE_PRODUCTS_LIST,
      variables: { saleId },
    },
  ];
  const { data } = useCommerceListProductsQuery({
    context,
    fetchPolicy: 'network-only',
    onError: (e) => errorSnackbar(e.message),
  });
  console.log('prefillData', prefillData);
  const editOn = prefillData && prefillData.id && prefillData.id !== '';
  const products = data?.commerceListProducts?.hits;
  const filteredSaleProducts = editOn
    ? products
    : products?.filter((el) => {
        return !existingProducts.find(
          (saleProduct: any) => el.id === saleProduct.product.id,
        );
      });
  const productOptions = filteredSaleProducts?.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });

  const ticketTypeOptions = getTicketTypesOptions(productOptions as []);
  const priceTypeOptions = getPriceOptions(typesOptions);
  const [createSaleProduct] = useCommerceSaleProductCreateMutation({
    context,
    onCompleted: () => {
      snackbar('Pricing for sale cycle added');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });
  const [updateSaleProduct] = useCommerceUpdateSaleProductMutation({
    context,
    onCompleted: () => {
      snackbar('Pricing for sale cycle updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: refetchQueriesContext,
  });

  const initialValues = (editMode: boolean) => {
    let values: SaleProductFormData = {
      active: false,
      description: '',
      id: '',
      name: '',
      product: '',
      type: '',
    };

    if (editMode) {
      values = {
        active: prefillData.active,
        amount: fromCents(prefillData.amount),
        description: prefillData.description,
        id: prefillData.id,
        name: prefillData.name,
        product: prefillData.product.id,
        type: prefillData.type,
      };
    }

    return values;
  };

  const pickMutation = (editMode: boolean, formData: SaleProductFormData) => {
    let mutation;
    const input = {
      active: formData.active,
      amount: toCents(Number(formData.amount)),
      description: formData.description.trim(),
      name: formData.name.trim(),
      product: formData.product,
      type: formData.type,
    };

    if (!editMode) {
      mutation = createSaleProduct({
        variables: {
          commerceSaleProductCreate: input,
          saleId,
        },
      });
    }

    if (editMode) {
      mutation = updateSaleProduct({
        variables: {
          commerceSaleProductUpdate: input,
          id: prefillData.id,
          saleId,
        },
      });
    }

    return mutation;
  };

  const setMutation = (formData: SaleProductFormData) => {
    return pickMutation(editOn, formData);
  };

  return (
    <FormikModal
      alertHeader={
        editOn ? 'Edit pricing for sale cycle' : 'Add pricing for sale cycle'
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
          <Spacing bottom="8px">
            <SelectField
              required
              label="Select ticket type"
              name="product"
              options={ticketTypeOptions}
            />
          </Spacing>
        </FieldWrapper>

        <FieldWrapper>
          <TextInputField
            required
            label="Display name of ticket type"
            name="name"
            placeholder="General attendee"
          />
        </FieldWrapper>

        <FieldWrapper>
          <Spacing bottom="8px">
            <TextAreaField
              fieldHeight="80px"
              label="Description"
              name="description"
              placeholder="Type description here"
            />
          </Spacing>
        </FieldWrapper>

        <FieldWrapper>
          <InlineWrapper>
            <SelectField
              required
              label="Price during sale cycle"
              name="type"
              options={priceTypeOptions}
            />

            <MoneyInputField
              required
              currencySymbol={currencySymbol}
              label="Amount"
              name="amount"
            />
            <CenteredVertically>
              <CheckboxField label="Active" name="active" />
            </CenteredVertically>
          </InlineWrapper>
        </FieldWrapper>
      </Spacing>
    </FormikModal>
  );
};

export default SaleProductModalWrapper;
