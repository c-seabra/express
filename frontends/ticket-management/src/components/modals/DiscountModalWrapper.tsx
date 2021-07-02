import FormikModal, {
  FieldWrapper,
} from '@websummit/components/src/molecules/FormikModal';
import SelectField, {
  blankOption,
  SelectFieldOption,
} from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { useCommerceCreateDealMutation } from '@websummit/graphql/src/@types/operations';
import { discountTemplateFilter } from '@websummit/graphql/src/lib/presets/dealSearchTerms';
import COMMERCE_LIST_DEALS from '@websummit/graphql/src/operations/queries/CommerceListDeals';
import STATIC_MESSAGES from '@websummit/tsutils/src/lib/constants/messages';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

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

export type DiscountFormData = {
  additional: string;
  code: string;
  endDate: any;
  id: string;
  name: string;
  reason: string;
  startDate: any;
  usages: number;
};

const validationSchema = Yup.object().shape({
  additional: Yup.string().nullable(),
  code: Yup.string()
    .max(6)
    .matches(
      /^D[A-Z0-9-]{1,5}$/,
      'Only upper case letters, hyphens and digits up to 6 chars starting with the letter D. DGA123',
    )
    .required('Code Prefix is required'),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  reason: Yup.string().min(1).required(),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  usages: Yup.number().integer().strict().min(1).required(),
});

const DiscountModalWrapper = ({ isOpen, closeModal }: ModalProps) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [createDeal] = useCommerceCreateDealMutation({
    context,
    onCompleted: () => {
      snackbar('Discount Template created');
    },
    onError: (error) => errorSnackbar(error.message),
    refetchQueries: [
      {
        context,
        query: COMMERCE_LIST_DEALS,
        variables: { terms: discountTemplateFilter },
      },
    ],
  });

  const initialValues = () => {
    return {
      additional: '',
      code: 'D-???-',
      endDate: '',
      name: '',
      reason: '',
      startDate: '',
      usages: 1,
    };
  };

  const pickMutation = (formData: DiscountFormData) => {
    const reason = formData.reason.trim();
    const additional = formData.additional
      ? formData.additional.trim()
      : 'no extra information given';
    const input = {
      active: false,
      code: formData.code.trim(),
      description: `${reason} — ${additional}`.trim(),
      endDate: new Date(formData.endDate).toISOString(),
      metadata: {
        discount: true,
        template: true,
      },
      name: formData.name.trim(),
      startDate: new Date(formData.startDate).toISOString(),
      usages: formData.usages,
    };

    return createDeal({
      variables: { commerceDealCreate: input },
    });
  };

  const setMutation = (formData: DiscountFormData) => {
    return pickMutation(formData);
  };

  const validReasons = [
    'Marketing and Promotional',
    'Differential for upgrades',
    'Others',
  ].map((text) => ({
    disabled: false,
    label: text,
    value: text,
  }));

  const reasonOptions: SelectFieldOption[] = [blankOption, ...validReasons];

  return (
    <FormikModal
      alertHeader="Create a discount template"
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
              <TextInputField
                required
                label="Discount Template name"
                name="name"
              />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <Spacing bottom="8px">
              <TextInputField
                required
                label="Discount Code Prefix"
                name="code"
              />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledInputField
                required
                label="Valid from"
                name="startDate"
                type="datetime-local"
              />

              <StyledInputField
                required
                label="Valid upto"
                name="endDate"
                type="datetime-local"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <Spacing bottom="8px">
              <TextInputField
                required
                label="Number of uses per discount"
                min="1"
                name="usages"
                step="1"
                type="number"
              />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <SelectField
              required
              label="Reason for usage"
              name="reason"
              options={reasonOptions}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Spacing bottom="8px">
              <TextAreaField
                fieldHeight="80px"
                label="Additional Information"
                name="additional"
              />
            </Spacing>
          </FieldWrapper>
        </Spacing>
      </>
    </FormikModal>
  );
};

export default DiscountModalWrapper;
