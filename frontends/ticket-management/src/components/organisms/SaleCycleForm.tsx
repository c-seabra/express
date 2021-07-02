import { Button } from '@websummit/components/src/atoms/Button';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import DateTimeInputField from '@websummit/components/src/molecules/DateTimeInputField';
import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import FormikForm from '@websummit/components/src/templates/FormikForm';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { useCommerceUpdateSaleMutation } from '@websummit/graphql/src/@types/operations';
import useGetEventTimeZone from '@websummit/graphql/src/hooks/useGetEventTimeZone';
import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/SalesCyclesList';
import STATIC_MESSAGES from '@websummit/tsutils/src/lib/constants/messages';
import {
  toIsoDateTime,
  toShortDateTime,
} from '@websummit/tsutils/src/utils/time';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

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

const StyledDateTimeInputField = styled(DateTimeInputField)`
  width: 48%;
`;

type Props = {
  prefillData: any;
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
  description: Yup.string().nullable(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const SaleCycleForm = ({ prefillData }: Props) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();

  const eventTimeZone = useGetEventTimeZone();
  const { ianaName } = eventTimeZone || {};

  const [updateCycle] = useCommerceUpdateSaleMutation({
    context,
    onCompleted: () => {
      snackbar('Sale cycle updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context, query: COMMERCE_SALES_LIST }],
  });

  const initialValues = () => {
    return {
      active: prefillData.active,
      description: prefillData.description,
      endDate: toShortDateTime(prefillData.endDate, ianaName),
      name: prefillData.name,
      startDate: toShortDateTime(prefillData.startDate, ianaName),
    };
  };

  const pickMutation = (formData: SaleCycleFormData) => {
    const input = {
      active: formData.active,
      description: formData.description ? formData.description.trim() : null,
      endDate: toIsoDateTime(formData.endDate, ianaName),
      name: formData.name.trim(),
      startDate: toIsoDateTime(formData.startDate, ianaName),
    };

    return updateCycle({
      variables: { commerceSale: input, id: prefillData.id },
    });
  };

  const setMutation = (formData: SaleCycleFormData) => {
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
              <TextInputField required label="Sale cycle name" name="name" />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledDateTimeInputField
                required
                ianaTimeZoneName={ianaName}
                label="Start date"
                name="startDate"
              />

              <StyledDateTimeInputField
                required
                ianaTimeZoneName={ianaName}
                label="End date"
                name="endDate"
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
          <FlexEnd>
            <Button type="submit">Edit</Button>
          </FlexEnd>
        </Spacing>
      </Fieldset>
    </FormikForm>
  );
};

export default SaleCycleForm;
