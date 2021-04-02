import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useCommerceCreateSaleMutation } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../../../ticket-support/src/lib/constants/messages';
import { switchCase } from '../../../../ticket-support/src/lib/utils/logic';
import { ModalInputMode } from '../../lib/types/modals';
import SaleCycleModal from './SaleCycleModal';

type ModalProps = {
  closeModal: () => void;
  isOpen: boolean;
  mode?: ModalInputMode;
  prefillData?: any;
};

type FormData = {
  description: string;
  endDate: any;
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

  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();
  const [createCycle] = useCommerceCreateSaleMutation({
    onCompleted: () => {
      snackbar('Sale cycle added');
    },
    onError: (e) => errorSnackbar(e.message),
  });
  // TODO ADD update
  // const { taxRateUpdate } = useTaxRateUpdateOperation();

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
        endDate: prefillData.endDate,
        name: prefillData.name,
        startDate: prefillData.startDate,
      };
    }

    return values;
  };

  const pickMutation = (_mode: ModalInputMode, formData: FormData) => {
    let mutation;
    const input = {
      description: formData.description.trim(),
      endDate: formData.endDate,
      name: formData.name.trim(),
      startDate: formData.startDate,
    };

    if (_mode === 'ADD') {
      mutation = createCycle({
        variables: { commerceSale: input },
      });
    }

    // if (_mode === 'EDIT') {
    //   mutation = taxRateUpdate({ input });
    // }

    return mutation;
  };

  const setMutation = (formData: FormData) => {
    return pickMutation(mode, formData);
  };

  return (
    <SaleCycleModal
      alertHeader={alertHeaderText(mode)}
      closeModal={closeModal}
      confirmSchema={confirmSchema}
      initialValues={initialValues(mode)}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={submitText(mode)}
    />
  );
};

export default SaleCycleModalWrapper;
