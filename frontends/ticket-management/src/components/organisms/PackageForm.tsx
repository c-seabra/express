import { Button } from '@websummit/components/src/atoms/Button';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import FormikForm from '@websummit/components/src/templates/FormikForm';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { toShortDateTime } from '@websummit/components/src/utils/time';
import {
  useCommerceListCategoriesQuery,
  useCommerceUpdateDealMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_LIST_DEALS from '@websummit/graphql/src/operations/queries/CommerceListDeals';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { useRequestContext } from '../app/AppContext';

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

export type PackageFormData = {
  active: boolean;
  category: any; // TODO fix type
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
};

const validationSchema = Yup.object().shape({
  active: Yup.boolean(),
  category: Yup.string(), // default to Other
  description: Yup.string().nullable(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const otherOption = {
  label: 'Other',
  value: undefined,
};

const getTicketTypesOptions = (types: any[] = []) => [
  ...types.map((type) => ({ label: type?.name, value: type?.id })),
  otherOption,
];

const PackageForm = ({ prefillData }: Props) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [updateDeal] = useCommerceUpdateDealMutation({
    context,
    onCompleted: () => {
      snackbar('Package updated');
    },
    onError: (error) => errorSnackbar(error.message),
    refetchQueries: [{ context, query: COMMERCE_LIST_DEALS }],
  });
  const { data } = useCommerceListCategoriesQuery({
    context,
    onError: (e) => errorSnackbar(e.message),
  });
  const ticketCategories = data?.commerceListCategories?.hits;
  const ticketCategoryOptions = getTicketTypesOptions(ticketCategories as []);

  const initialValues = () => {
    return {
      active: prefillData.active,
      category: prefillData.id,
      description: prefillData.description,
      endDate: toShortDateTime(prefillData.endDate),
      name: prefillData.name,
      startDate: toShortDateTime(prefillData.startDate),
    };
  };

  const pickMutation = (formData: PackageFormData) => {
    const input = {
      active: formData.active,
      category: formData.id,
      description: formData.description ? formData.description.trim() : null,
      endDate: new Date(formData.endDate).toISOString(),
      name: formData.name.trim(),
      startDate: new Date(formData.startDate).toISOString(),
    };

    return updateDeal({
      variables: { commerceDealUpdate: input, id: prefillData.id },
    });
  };

  const setMutation = (formData: PackageFormData) => {
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
              <TextInputField required label="Package name" name="name" />
            </Spacing>
          </FieldWrapper>

          <FieldWrapper>
            <Spacing bottom="8px">
              <SelectField
                required
                label="Ticket category"
                name="category"
                options={ticketCategoryOptions}
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
          <FlexEnd>
            <Button type="submit">Edit</Button>
          </FlexEnd>
        </Spacing>
      </Fieldset>
    </FormikForm>
  );
};

export default PackageForm;
