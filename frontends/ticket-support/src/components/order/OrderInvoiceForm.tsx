import { Button } from '@websummit/components/src/atoms/Button';
import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import FormikForm from '@websummit/components/src/templates/FormikForm';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { useCommerceUpdateSaleMutation } from '@websummit/graphql/src/@types/operations';
import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/SalesCyclesList';
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

const StyledInputField = styled(TextInputField)`
  width: 48%;
`;

type Props = {
  prefillData: any;
};

export type OrderInvoiceFormData = {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  companyTaxNo: string;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  lastName: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  email: Yup.string().email().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  addressLine1: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  addressLine2: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  addressLine3: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  addressLine4: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  companyTaxNo: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const OrderInvoiceForm = ({ prefillData }: Props) => {
  const context = useRequestContext();
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
  // const [updateCycle] = useCommerceUpdateSaleMutation({
  //   context,
  //   onCompleted: () => {
  //     snackbar('Sale cycle updated');
  //   },
  //   onError: (e) => errorSnackbar(e.message),
  //   refetchQueries: [{ context, query: COMMERCE_SALES_LIST }],
  // });

  const initialValues = () => {
    return {
      // firstName: prefillData.;
      // lastName: prefillData.;
      // email: prefillData.;
      // addressLine1: prefillData.;
      // addressLine2: prefillData.;
      // addressLine3: prefillData.;
      // addressLine4: prefillData.;
      // companyTaxNo: prefillData.;
    };
  };

  // const pickMutation = (formData: SaleCycleFormData) => {
  const pickMutation = (formData: any) => {
    const input = {};

    return updateCycle({
      variables: { commerceSale: input, id: prefillData.id },
    });
  };

  // const setMutation = (formData: SaleCycleFormData) => {
  const setMutation = (formData: any) => {
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
            <InlineWrapper>
              <StyledInputField
                required
                label="First name"
                name="firstName"
                placeholder="Jane"
                type="text"
              />

              <StyledInputField
                required
                label="Last name"
                name="lastName"
                placeholder="Doe"
                type="text"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <TextInputField
              required
              label="Email address"
              name="email"
              placeholder="jane.doe@company.com"
              type="text"
            />
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledInputField
                required
                label="Address line 1"
                name="addressLine1"
                placeholder="Road 1"
                type="text"
              />

              <StyledInputField
                label="Address line 2"
                name="addressLine2"
                placeholder="Green lane"
                type="text"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledInputField
                label="Address line 3"
                name="addressLine3"
                placeholder="Green lane"
                type="text"
              />

              <StyledInputField
                label="Address line 4"
                name="addressLine4"
                placeholder="Green lane"
                type="text"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <StyledInputField
              required
              label="Company tax no."
              name="companyTaxNo"
              placeholder="IE 1234567"
              type="text"
            />
          </FieldWrapper>

          <FlexEnd>
            <Button type="submit">Save</Button>
          </FlexEnd>
        </Spacing>
      </Fieldset>
    </FormikForm>
  );
};

export default OrderInvoiceForm;
