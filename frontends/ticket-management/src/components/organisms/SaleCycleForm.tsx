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
import { toShortDateTime } from '@websummit/components/src/utils/time';
import { useCommerceUpdateSaleMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/SalesCyclesList';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useAppContext } from '../app/AppContext';

const StyledInputField = styled(TextInputField)`
  width: 48%;
`;

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

type Props = {
  prefillData: any;
};

export type SaleCycleFormData = {
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
};

const validationSchema = Yup.object().shape({
  description: Yup.string().nullable(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const SaleCycleForm = ({ prefillData }: Props) => {
  const { conferenceSlug, token } = useAppContext();
  const context = {
    slug: conferenceSlug,
    token,
  };
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
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
      description: prefillData.description,
      endDate: toShortDateTime(prefillData.endDate),
      name: prefillData.name,
      startDate: toShortDateTime(prefillData.startDate),
    };
  };

  const pickMutation = (formData: SaleCycleFormData) => {
    const input = {
      description: formData.description ? formData.description.trim() : null,
      endDate: new Date(formData.endDate).toISOString(),
      name: formData.name.trim(),
      startDate: new Date(formData.startDate).toISOString(),
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
          <FlexEnd>
            <Button type="submit">Edit</Button>
          </FlexEnd>
        </Spacing>
      </Fieldset>
    </FormikForm>
  );
};

export default SaleCycleForm;
