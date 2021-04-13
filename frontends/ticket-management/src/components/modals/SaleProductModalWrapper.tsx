import FormikModal, {
  FieldWrapper,
} from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { toShortDateTime } from '@websummit/components/src/utils/time';
import {
  useCommerceCreateProductMutation,
  useCommerceCreateSaleMutation,
  useCommerceUpdateSaleMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/SalesCyclesList';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import SelectField from '@websummit/components/src/molecules/SelectField';
import ToggleField from '@websummit/components/src/molecules/ToggleField';
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
};

export type ProductFormData = {
  active: boolean,
  description: string;
  name: string,
  price: number,
  tags: any,
  taxMode: string,
  taxType: any,
};

const alertHeaderText = (_mode: string): string => {
  return switchCase({
    ADD: 'Create a product',
    EDIT: `Edit product`,
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
  description: Yup.string(),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  price: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  taxMode: Yup.string(),
  taxType: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const SaleProductModalWrapper = ({
  isOpen,
  closeModal,
  mode = 'ADD',
  prefillData,
}: ModalProps) => {
  const { token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [createProduct] = useCommerceCreateProductMutation({
    context: { token },
    onCompleted: () => {
      snackbar('Product added to cycle');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_SALES_LIST }],
  });
  const [updateCycle] = useCommerceUpdateSaleMutation({
    context: { token },
    onCompleted: () => {
      snackbar('Product updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_SALES_LIST }],
  });

  const initialValues = (_mode: ModalInputMode) => {
    let values = {
      active: false,
      description: '',
      name: '',
      price: 0,
      taxMode: '',
      taxType: '',
    };

    if (_mode === 'EDIT') {
      values = {
        active: false,
        description: '',
        name: '',
        price: 0,
        taxMode: 'B2B',
        taxType: '',
      };
    }

    return values;
  };

  const pickMutation = (_mode: ModalInputMode, formData: ProductFormData) => {
    let mutation;
    const input = {
      active: formData.active,
      description: formData.description.trim(),
      tags: formData.tags,
      name: formData.name.trim(),
      price: formData.price,
      taxMode: formData.taxMode,
      taxType: formData.taxType,
    };

    if (_mode === 'ADD') {
      mutation = createProduct({
        variables: {
          input: {
            description: 'Test description',
            name: 'test name',
            price: 1500,
            taxType: { name: 'test tax type' },
          },
        },
      });
    }

    if (_mode === 'EDIT') {
      mutation = updateCycle({
        variables: { commerceSale: input, id: prefillData.id },
      });
    }

    return mutation;
  };

  const setMutation = (formData: ProductFormData) => {
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
            <TextInputField
              required
              label="Product name"
              name="name"
              placeholder="General attendee"
            />
          </Spacing>
        </FieldWrapper>

        <FieldWrapper>
          <InlineWrapper>
            <SelectField
              required
              label="Tax mode"
              name="taxMode"
              // options={paymentGatewayOptions}
            />
            {/* {getFieldsForPaymentGateway(values.gateway)} */}
            {/* </FieldsContainer> */}

            <ToggleField label="active" name="activeToggle" value="true" />
          </InlineWrapper>
        </FieldWrapper>

        <FieldWrapper>
          <Spacing bottom="8px">
            <TextAreaField
              fieldHeight="80px"
              label="Tags"
              name="tags"
              placeholder="Cyclable / Special"
            />
          </Spacing>
        </FieldWrapper>

        <FieldWrapper>
          <InlineWrapper>
            <SelectField
              required
              label="Tax type"
              name="taxMode"
              // options={paymentGatewayOptions}
            />
            {/* {getFieldsForPaymentGateway(values.gateway)} */}
            {/* </FieldsContainer> */}

            <TextInputField required label="Price" name="price" />
          </InlineWrapper>
        </FieldWrapper>
      </Spacing>
    </FormikModal>
  );
};

export default SaleProductModalWrapper;
