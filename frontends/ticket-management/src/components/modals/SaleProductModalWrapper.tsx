import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import FormikModal, {
  FieldWrapper,
} from '@websummit/components/src/molecules/FormikModal';
import Modal from '@websummit/components/src/molecules/Modal';
import MoneyInputField from '@websummit/components/src/molecules/MoneyInputField';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import PricesWithTaxTable from '@websummit/glue/src/lib/prices/PricesWithTaxTable';
import {
  CommerceGetStoreQuery,
  CommerceListProductsQuery,
  CommerceProduct,
  CommerceProductTaxMode,
  CommerceSaleProductType,
  useCommerceSaleProductCreateMutation,
  useCommerceUpdateSaleProductMutation,
} from '@websummit/graphql/src/@types/operations';
import {
  CommerceGetQueryResult,
  CommerceListQueryHitsResult,
} from '@websummit/graphql/src/lib/types';
import COMMERCE_SALE_PRODUCTS_LIST from '@websummit/graphql/src/operations/queries/CommerceListSaleProducts';
import STATIC_MESSAGES from '@websummit/tsutils/src/lib/constants/messages';
import { fromCents, toCents } from '@websummit/tsutils/src/lib/utils/price';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import { Form } from 'formik';
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

type TaxTypes = CommerceGetQueryResult<
  CommerceGetStoreQuery,
  'commerceGetStore'
>['taxTypes'];

type CommerceProducts = CommerceListQueryHitsResult<
  CommerceListProductsQuery,
  'commerceListProducts'
>;

type ModalProps = {
  closeModal: () => void;
  currencySymbol: string;
  existingProducts: any;
  isOpen: boolean;
  prefillData?: any;
  products: CommerceProducts;
  saleId: string;
  storeCountry?: string;
  taxTypes?: TaxTypes;
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
  name: Yup.string(),
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

const getProductTaxOptions = ({
  commerceProduct,
  taxTypes,
  storeCountry,
}: {
  commerceProduct?: Pick<CommerceProduct, 'taxMode'> & {
    taxType?: { id?: string | null };
  };
  storeCountry?: string;
  taxTypes: TaxTypes;
}) => {
  const productTaxType = taxTypes?.find(
    (type) => type.id === commerceProduct?.taxType?.id,
  );

  // if product tax mode is B2C, we want to return only one tax rate
  // which is the tax rate matching the product and the store country
  if (commerceProduct?.taxMode === CommerceProductTaxMode.B2C) {
    const productTaxByStoreCountry = productTaxType?.taxes?.find(
      (tax) => tax.country === storeCountry,
    );

    return productTaxByStoreCountry ? [productTaxByStoreCountry] : [];
  }

  return productTaxType?.taxes;
};

const SaleProductModalWrapper = ({
  closeModal,
  currencySymbol,
  isOpen,
  existingProducts,
  prefillData,
  products,
  saleId,
  storeCountry,
  taxTypes = [],
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

  const editOn = prefillData && prefillData.id && prefillData.id !== '';
  const filteredSaleProducts = editOn
    ? products
    : products?.filter((el) => {
        return !existingProducts?.find(
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
      customForm={(props: any) => {
        const selectedTicketType = products?.find(
          (product) => product.id === props.values.product,
        );

        const ticketTypeTaxRates = getProductTaxOptions({
          commerceProduct: selectedTicketType,
          storeCountry,
          taxTypes,
        });

        return (
          <Form>
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
                  label="Display name of ticket type"
                  name="name"
                  placeholder={
                    ticketTypeOptions?.find(
                      (type) => type.value === props?.values?.product,
                    )?.label
                  }
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
                    label="Price excluding tax"
                    name="amount"
                  />
                  <CenteredVertically>
                    <CheckboxField label="Active" name="active" />
                  </CenteredVertically>
                </InlineWrapper>
              </FieldWrapper>

              {(ticketTypeTaxRates?.length || 0) > 0 ? (
                <PricesWithTaxTable
                  currencySymbol={currencySymbol}
                  price={props.values.amount}
                  taxRates={ticketTypeTaxRates}
                />
              ) : null}
              <Spacing top="48px">
                <FieldWrapper>
                  <Modal.DefaultFooter
                    submitText={editOn ? 'Save' : 'Create'}
                    onCancelClick={closeModal}
                  />
                </FieldWrapper>
              </Spacing>
            </Spacing>
          </Form>
        );
      }}
      initialValues={initialValues(editOn)}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={editOn ? 'Save' : 'Create'}
      validationSchema={validationSchema}
    />
  );
};

export default SaleProductModalWrapper;
