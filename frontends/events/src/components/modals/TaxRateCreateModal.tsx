import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import Icon from '@websummit/components/src/atoms/Icon';
import Modal from '@websummit/components/src/molecules/Modal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { upperWord } from '@websummit/components/src/utils/text';
import {
  EventConfigurationCountry,
  TaxType,
  useCountriesQuery,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { ModalInputMode } from './TaxRateCreateModalWrapper';

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
  mode?: ModalInputMode;
  mutationCallback: (values?: any) => void;
  prefilledTax?: any;
  submitText: string;
};

const confirmSchema = Yup.object().shape({
  country: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  type: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  value: Yup.number()
    .min(0, 'Cannot be negative')
    .max(100, 'Must be less than 100%')
    .required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const TaxRateCreateModal = ({
  isOpen,
  closeModal,
  cancelText,
  alertHeader,
  mutationCallback,
  submitText = 'Submit',
  mode = 'ADD',
  prefilledTax,
}: TaxRateCreateModalProps) => {
  const { data } = useCountriesQuery();
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

  const blankOption = {
    label: 'Select one',
    value: 'null',
  };

  const getCountryOptions = (
    countries: Pick<EventConfigurationCountry, 'name' | 'id'>[] = [],
  ) => [
    blankOption,
    ...countries.map((country) => ({
      label: country?.name,
      value: country?.id,
    })),
  ];

  const countryOptions = getCountryOptions(
    data?.countries?.edges?.map((edge) => edge.node),
  );

  const taxTypes = [
    blankOption,
    ...(Object.values(TaxType).map((taxType) => ({
      label: upperWord(taxType),
      value: taxType,
    })) || []),
  ];

  const initialValues = (_mode: ModalInputMode): any => {
    if (_mode === 'ADD') {
      return {
        country: '',
        name: '',
        type: '',
        value: '',
      };
    }

    if (_mode === 'EDIT') {
      return {
        country: prefilledTax.country.id,
        name: prefilledTax.name,
        type: prefilledTax.taxType.toUpperCase(),
        value: prefilledTax.value,
      };
    }
  };

  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={handleClose}>
      <Formik
        initialValues={initialValues(mode)}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={confirmSchema}
        onSubmit={async (values) => {
          mutationCallback(values);

          handleClose();
        }}
      >
        {({ resetForm, submitForm }) => {
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm });
          }

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
                    <Spacing bottom="8px">
                      <TextInputField label="Tax name" name="name" />
                    </Spacing>
                    <Spacing bottom="8px">
                      <SelectField
                        label="Country of tax"
                        name="country"
                        options={countryOptions}
                      />
                    </Spacing>
                    <Spacing bottom="8px">
                      <TextInputField label="Tax amount %" name="value" />
                    </Spacing>
                    <Spacing bottom="8px">
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
