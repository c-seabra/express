import { Button } from '@websummit/components/src/atoms/Button';
import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import ToggleField from '@websummit/components/src/molecules/ToggleField';
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
`;

// const Separator = styled.div`
//   height: 1px;
//   border-top: 2px solid #f1f1f1;
//   margin: 0 -100%;
// `;

type Props = {
  prefillData: any;
  // prefillData?: SaleCycleFormData;
};

export type SaleCycleFormData = {
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

const SaleCycleForm = ({ prefillData }: Props) => {
  const { token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [updateCycle] = useCommerceUpdateSaleMutation({
    context: { token },
    onCompleted: () => {
      snackbar('Sale cycle updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_SALES_LIST }],
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
      description: formData.description.trim(),
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

          {/* <FieldWrapper> */}
          {/*  <Spacing bottom="8px"> */}
          {/*     Active */}
          {/*    <ToggleField label="active" name="active-toggle" /> */}
          {/*  </Spacing> */}
          {/* </FieldWrapper> */}

          {/*<Spacing bottom="2rem">*/}
          {/*  <Separator />*/}
          {/*</Spacing>*/}

          <FlexEnd>
            <Button>Edit</Button>
          </FlexEnd>
        </Spacing>
      </Fieldset>
    </FormikForm>
  );
};

export default SaleCycleForm;
