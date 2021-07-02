import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
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
import { useCommerceCreateSaleMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/SalesCyclesList';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import STATIC_MESSAGES from '@websummit/tsutils/src/lib/constants/messages';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

const StyledInputField = styled(TextInputField)`
  width: 48%;
`;

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

type ModalProps = {
  closeModal: () => void;
  isOpen: boolean;
};

export type SaleCycleFormData = {
  active: boolean;
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
};

const validationSchema = Yup.object().shape({
  active: Yup.boolean(),
  description: Yup.string(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const SaleCycleModalWrapper = ({ isOpen, closeModal }: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [createCycle] = useCommerceCreateSaleMutation({
    context,
    onCompleted: () => {
      snackbar('Sale cycle added');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context, query: COMMERCE_SALES_LIST }],
  });

  const initialValues = () => {
    return {
      active: false,
      description: '',
      endDate: '',
      name: '',
      startDate: '',
    };
  };

  const pickMutation = (formData: SaleCycleFormData) => {
    const input = {
      active: formData.active,
      description: formData.description.trim(),
      endDate: new Date(formData.endDate).toISOString(),
      name: formData.name.trim(),
      startDate: new Date(formData.startDate).toISOString(),
    };

    return createCycle({
      variables: { commerceSale: input },
    });
  };

  const setMutation = (formData: SaleCycleFormData) => {
    return pickMutation(formData);
  };

  return (
    <FormikModal
      alertHeader="Create a sale cycle"
      closeModal={closeModal}
      initialValues={initialValues()}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText="Create"
      validationSchema={validationSchema}
    >
      <Spacing top="8px">
        <FieldWrapper>
          <Spacing bottom="8px">
            <TextInputField required label="Sale cycle name" name="name" />
          </Spacing>
        </FieldWrapper>

        <FieldWrapper>
          <InlineWrapper>
            <StyledInputField
              required
              label="Start date"
              name="startDate"
              type="datetime-local"
            />

            <StyledInputField
              required
              label="End date"
              name="endDate"
              type="datetime-local"
            />
          </InlineWrapper>
        </FieldWrapper>

        <FieldWrapper>
          <Spacing bottom="8px">
            <TextAreaField
              fieldHeight="80px"
              label="Sale cycle description"
              name="description"
            />
          </Spacing>
        </FieldWrapper>

        <FieldWrapper>
          <Spacing bottom="8px">
            <CheckboxField label="Active" name="active" />
          </Spacing>
        </FieldWrapper>
      </Spacing>
    </FormikModal>
  );
};

export default SaleCycleModalWrapper;
