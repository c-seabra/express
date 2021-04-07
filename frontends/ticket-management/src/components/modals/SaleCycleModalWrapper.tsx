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
import { toShortDate } from '@websummit/components/src/utils/time';
import {
  useCommerceCreateSaleMutation,
  useCommerceUpdateSaleMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_SALES_LIST from '@websummit/graphql/src/operations/queries/SalesCyclesList';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import { ModalInputMode } from '../../lib/types/modals';
import { useAppContext } from '../app/AppContext';

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
  mode?: ModalInputMode;
  prefillData?: any;
};

export type SaleCycleFormData = {
  description: string;
  endDate: any;
  id: string;
  name: string;
  startDate: any;
};

const alertHeaderText = (_mode: string): string => {
  return switchCase({
    ADD: 'Create a sale cycle',
    EDIT: `Edit sale cycle`,
  })('')(_mode);
};

const submitText = (_mode: string): string => {
  return switchCase({
    ADD: 'Create',
    EDIT: 'Edit',
  })('')(_mode);
};

const confirmSchema = Yup.object().shape({
  description: Yup.string(),
  endDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  name: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  startDate: Yup.date().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const SaleCycleModalWrapper = ({
  isOpen,
  closeModal,
  mode = 'ADD',
  prefillData,
}: ModalProps) => {
  const { token } = useAppContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [createCycle] = useCommerceCreateSaleMutation({
    context: { token },
    onCompleted: () => {
      snackbar('Sale cycle added');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_SALES_LIST }],
  });
  const [updateCycle] = useCommerceUpdateSaleMutation({
    context: { token },
    onCompleted: () => {
      snackbar('Sale cycle updated');
    },
    onError: (e) => errorSnackbar(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_SALES_LIST }],
  });

  const initialValues = (_mode: ModalInputMode) => {
    let values = {
      description: '',
      endDate: '',
      name: '',
      startDate: '',
    };

    if (_mode === 'EDIT') {
      values = {
        description: prefillData.description,
        endDate: toShortDate(prefillData.endDate),
        name: prefillData.name,
        startDate: toShortDate(prefillData.startDate),
      };
    }

    return values;
  };

  const pickMutation = (_mode: ModalInputMode, formData: SaleCycleFormData) => {
    let mutation;
    const input = {
      description: formData.description.trim(),
      endDate: new Date(formData.endDate).toISOString(),
      name: formData.name.trim(),
      startDate: new Date(formData.startDate).toISOString(),
    };

    if (_mode === 'ADD') {
      mutation = createCycle({
        variables: { commerceSale: input },
      });
    }

    if (_mode === 'EDIT') {
      mutation = updateCycle({
        variables: { commerceSale: input, id: prefillData.id },
      });
    }

    return mutation;
  };

  const setMutation = (formData: SaleCycleFormData) => {
    return pickMutation(mode, formData);
  };

  return (
    <FormikModal
      alertHeader={alertHeaderText(mode)}
      closeModal={closeModal}
      confirmSchema={confirmSchema}
      initialValues={initialValues(mode)}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={submitText(mode)}
    >
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
              type="date"
            />

            <StyledInputField
              required
              label="End date"
              name="endDate"
              type="date"
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
      </Spacing>
    </FormikModal>
  );
};

export default SaleCycleModalWrapper;
