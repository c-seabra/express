import { Button } from '@websummit/components/src/atoms/Button';
import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import FormikForm from '@websummit/components/src/templates/FormikForm';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  toIsoDateTime,
  toShortDateTime,
} from '@websummit/tsutils/src/utils/time';
import { useCommerceUpdateDealMutation } from '@websummit/graphql/src/@types/operations';
import useGetEventTimeZone from '@websummit/graphql/src/hooks/useGetEventTimeZone';
import { discountTemplateFilter } from '@websummit/graphql/src/lib/presets/dealSearchTerms';
import COMMERCE_LIST_DEALS from '@websummit/graphql/src/operations/queries/CommerceListDeals';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useRequestContext } from '../app/AppContext';

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
`;

const StyledDateTimeInputField = styled(TextInputField)`
  width: 48%;
`;

type Props = {
  prefillData: any;
};

export type DiscountFormData = {
  code: string;
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
  usages: number;
};

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .max(6)
    .matches(
      /^D[A-Z0-9-]{1,5}$/,
      'Only upper case letters, hyphens and digits up to 6 chars starting with the letter D. DGA123',
    )
    .required('Code Prefix is required'),
  description: Yup.string().min(1).required(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  usages: Yup.number().integer().strict().min(1).required(),
});

const DiscountTemplateForm = ({ prefillData }: Props) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();

  const eventTimeZone = useGetEventTimeZone();
  const { ianaName } = eventTimeZone || {};

  const [updateDeal] = useCommerceUpdateDealMutation({
    context,
    onCompleted: () => {
      snackbar('Discount Template updated');
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
      code: prefillData.code,
      description: prefillData.description,
      endDate: toShortDateTime(prefillData.endDate, ianaName),
      name: prefillData.name,
      startDate: toShortDateTime(prefillData.startDate, ianaName),
      usages: prefillData.usages,
    };
  };

  const pickMutation = (formData: DiscountFormData) => {
    const input = {
      code: formData.code.trim(),
      description: formData.description ? formData.description.trim() : null,
      endDate: toIsoDateTime(formData.endDate, ianaName),
      name: formData.name.trim(),
      startDate: toIsoDateTime(formData.startDate, ianaName),
      usages: formData.usages,
    };

    return updateDeal({
      variables: { commerceDealUpdate: input, id: prefillData.id },
    });
  };

  const setMutation = (formData: DiscountFormData) => {
    return pickMutation(formData);
  };

  return (
    <FormikForm
      initialValues={initialValues()}
      submitCallback={setMutation}
      validationSchema={validationSchema}
    >
      <Fieldset disabled={false}>
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
              <StyledDateTimeInputField
                required
                label="Valid from"
                name="startDate"
                type="datetime-local"
              />

              <StyledDateTimeInputField
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
            <Spacing bottom="8px">
              <TextAreaField
                fieldHeight="80px"
                label="Reason Information"
                name="description"
              />
            </Spacing>
          </FieldWrapper>
          <FlexEnd>
            <Button type="submit">Edit</Button>
          </FlexEnd>
        </Spacing>
      </Fieldset>
    </FormikForm>
  );
};

export default DiscountTemplateForm;
