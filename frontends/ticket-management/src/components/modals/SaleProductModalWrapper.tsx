import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import FormikModal, {
  FieldWrapper,
} from '@websummit/components/src/molecules/FormikModal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
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
import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import { ModalInputMode } from '../../lib/types/modals';
import { useAppContext } from '../app/AppContext';

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

type ModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  mode?: ModalInputMode;
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

const alertHeaderText = (_mode: string): string => {
  return switchCase({
    ADD: 'Add pricing for sale cycle',
    EDIT: `Edit pricing for sale cycle`,
  })('')(_mode);
};

const submitText = (_mode: string): string => {
  return switchCase({
    ADD: 'Create',
    EDIT: 'Save',
  })('')(_mode);
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
  mode = 'ADD',
  prefillData,
  saleId,
}: ModalProps) => {
  const { conferenceSlug, token } = useAppContext();
  const context = {
    slug: conferenceSlug,
    token,
  };

  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const { data } = useCommerceListProductsQuery({
    context,
    onError: (e) => errorSnackbar(e.message),
  });
  const products = data?.commerceListProducts?.hits;
  const productOptions = products?.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });
  const ticketTypeOptions = getTicketTypesOptions(productOptions as []);
  const priceTypeOptions = getPriceOptions(typesOptions);
  const refetchQueriesContext = [
    {
      context,
      query: COMMERCE_SALE_PRODUCTS_LIST,
      variables: { saleId },
    },
  ];
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

  const initialValues = (_mode: ModalInputMode) => {
    let values: SaleProductFormData = {
      active: false,
      description: '',
      id: '',
      name: '',
      product: '',
      type: '',
    };

    if (_mode === 'EDIT') {
      values = {
        active: prefillData.active,
        amount: prefillData.amount,
        description: prefillData.description,
        id: prefillData.id,
        name: prefillData.name,
        product: prefillData.product.id,
        type: prefillData.type,
      };
    }

    return values;
  };

  const pickMutation = (
    _mode: ModalInputMode,
    formData: SaleProductFormData,
  ) => {
    let mutation;
    const input = {
      active: formData.active,
      amount: Number(formData.amount),
      description: formData.description.trim(),
      name: formData.name.trim(),
      product: formData.product,
      type: formData.type,
    };

    if (_mode === 'ADD') {
      mutation = createSaleProduct({
        variables: {
          commerceSaleProductCreate: input,
          saleId,
        },
      });
    }

    if (_mode === 'EDIT') {
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
    return pickMutation(mode, formData);
  };

  return (
    <FormikModal
      alertHeader={alertHeaderText(mode)}
      closeModal={closeModal}
      initialValues={initialValues(mode)}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={submitText(mode)}
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

            <TextInputField
              required
              label="Amount"
              name="amount"
              placeholder="€0"
            />

            <CheckboxField label="Active" name="active" />
          </InlineWrapper>
        </FieldWrapper>
      </Spacing>
    </FormikModal>
  );
};

export default SaleProductModalWrapper;
