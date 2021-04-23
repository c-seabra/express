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
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useRequestContext} from '../app/AppContext';
import SelectField from "../../../../../packages/components/src/molecules/SelectField";
import CheckboxField from "../../../../../packages/components/src/molecules/CheckboxField";
import {Button} from "../../../../../packages/components/src/atoms/Button";

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

export type PackageFormData = {
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
};

const validationSchema = Yup.object().shape({
  description: Yup.string(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const PackageModalWrapper = ({ isOpen, closeModal }: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [createCycle] = useCommerceCreateSaleMutation({
    context,
    onCompleted: () => {
      snackbar('Product added');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context, query: COMMERCE_SALES_LIST }],
  });

  const initialValues = () => {
    return {
      description: '',
      endDate: '',
      name: '',
      startDate: '',
    };
  };

  const pickMutation = (formData: PackageFormData) => {
    const input = {
      description: formData.description.trim(),
      endDate: new Date(formData.endDate).toISOString(),
      name: formData.name.trim(),
      startDate: new Date(formData.startDate).toISOString(),
    };

    return createCycle({
      variables: { commerceSale: input },
    });
  };

  const setMutation = (formData: PackageFormData) => {
    return pickMutation(formData);
  };

  return (
    <FormikModal
      alertHeader="Create a package"
      closeModal={closeModal}
      initialValues={initialValues()}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText="Create"
      validationSchema={validationSchema}
    >
      <>
        <Spacing top="2rem">
          <FieldWrapper>
            <Spacing bottom="8px">
              <TextInputField required label="Package name" name="name" />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <Spacing bottom="8px">
              <SelectField
                  required
                  label="Ticket category"
                  name="category"
                  // options={ticketCategoryOptions}
              />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledInputField
                  required
                  label="Go live at"
                  name="startDate"
                  type="datetime-local"
              />

              <StyledInputField
                  required
                  label="Sale end date"
                  name="endDate"
                  type="datetime-local"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <Spacing bottom="8px">
              <TextAreaField
                  fieldHeight="80px"
                  label="Package description"
                  name="description"
              />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <Spacing bottom="8px">
              <CheckboxField label="On sale" name="active" />
            </Spacing>
          </FieldWrapper>
          {/*<FlexEnd>*/}
          {/*  <Button type="submit">Edit</Button>*/}
          {/*</FlexEnd>*/}
        </Spacing>
      </>
    </FormikModal>
  );
};

export default PackageModalWrapper;
