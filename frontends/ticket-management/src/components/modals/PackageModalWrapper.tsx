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
import { useCommerceCreateDealMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_LIST_DEALS from '@websummit/graphql/src/operations/queries/CommerceListDeals';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useRequestContext } from '../app/AppContext';

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
  active: boolean;
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
};

const validationSchema = Yup.object().shape({
  active: Yup.boolean(),
  description: Yup.string().nullable(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const PackageModalWrapper = ({ isOpen, closeModal }: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [createDeal] = useCommerceCreateDealMutation({
    context,
    onCompleted: () => {
      snackbar('Package updated');
    },
    onError: (error) => errorSnackbar(error.message),
    refetchQueries: [{ context, query: COMMERCE_LIST_DEALS }],
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

  const pickMutation = (formData: PackageFormData) => {
    const input = {
      active: formData.active,
      description: formData.description ? formData.description.trim() : null,
      endDate: new Date(formData.endDate).toISOString(),
      name: formData.name.trim(),
      startDate: new Date(formData.startDate).toISOString(),
    };

    return createDeal({
      variables: { commerceDealCreate: input },
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
        </Spacing>
      </>
    </FormikModal>
  );
};

export default PackageModalWrapper;
