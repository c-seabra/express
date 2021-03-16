import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import Icon from '@websummit/components/src/atoms/Icon';
import Modal from '@websummit/components/src/molecules/Modal';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { Form, Formik } from 'formik';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import SelectField from '@websummit/components/src/molecules/SelectField';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 600px;
`;

export const Text = styled.div`
  font-size: 14px;
  letter-spacing: 0;
  line-height: 28px;
  max-width: 580px;
  text-align: left;
`;

export const HeaderText = styled.div`
  color: #0067e9;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

export const FieldWrapper = styled.div`
  min-width: 580px;
  text-align: left;
  padding: 0;
`;

const StyledRow = styled.div`
  display: flex;
  min-width: 590px;
`;

export const StyledActionRow = styled.div`
  display: flex;
  justify-content: space-around;

  > * {
    margin-right: 32px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const IconWrapper = styled.div`
  > .material-icons {
    font-size: 40px;
    color: #0067e9;
  }
`;

type TaxRateCreateModalProps = {
  alertHeader: string;
  cancelText: string;
  closeModal: () => void;
  isOpen: boolean;
  mutationCallback: (values?: any) => Promise<void>;
  submitText: string;
};

const confirmSchema = Yup.object().shape({
  amount: Yup.number().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  country: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  type: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const TaxRateCreateModal = ({
  isOpen,
  closeModal,
  cancelText,
  alertHeader,
  mutationCallback,
  submitText = 'Submit',
}: TaxRateCreateModalProps) => {
  const [formControls, setFormControls] = useState<
    | {
        boundReset?: () => void;
        boundSubmit?: (event?: FormEvent) => void;
      }
    | undefined
  >();

  const handleClose = () => {
    if (formControls?.boundReset) {
      formControls.boundReset();
    }

    setFormControls(undefined);
    closeModal();
  };

  const taxTypes = [
    ...([1, 2].map((industry) => ({
      label: 'test',
      value: 'valuetest',
    })) || []),
  ];

  // const taxTypes = [
  //     // blankOption,
  //     ...(event?.industries?.map((industry) => ({
  //         label: industry.name,
  //         value: industry.id,
  //     })) || []),
  // ];

  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={handleClose}>
      <Formik
        initialValues={{
          amount: 23,
          reason: '',
          sendEmailNotification: false,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={confirmSchema}
        onSubmit={async (values) => {
          await mutationCallback(values);

          handleClose();
        }}
      >
        {({ resetForm }) => {
          return (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>info</Icon>
                  </IconWrapper>
                </Spacing>

                <Spacing bottom="40px">
                  <HeaderText>{alertHeader}</HeaderText>
                </Spacing>

                <Spacing top="8px">
                   <FieldWrapper>
                  <Spacing bottom="23px">
                    <TextInputField label="Tax name" name="name" />
                  </Spacing>
                  <Spacing bottom="23px">
                    <TextInputField label="Country of tax" name="country" />
                  </Spacing>
                  <Spacing bottom="23px">
                    <TextInputField label="Tax amount %" name="amount" />
                  </Spacing>
                  <Spacing bottom="23px">
                    <SelectField
                      label="Tax type"
                      name="type"
                      options={taxTypes}
                    />
                  </Spacing>
                   </FieldWrapper>
                </Spacing>

                <Spacing bottom="50px">
                  <StyledActionRow>
                    <SecondaryButton onClick={closeModal}>
                      {cancelText}
                    </SecondaryButton>
                    <Button type="submit">{submitText}</Button>
                  </StyledActionRow>
                </Spacing>
              </Wrapper>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default TaxRateCreateModal;
