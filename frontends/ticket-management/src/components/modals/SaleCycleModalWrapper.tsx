import React from 'react';

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
  endDate: string;
  name: string;
  startDate: string;
};

const SaleCycleModalWrapper = ({
  isOpen,
  closeModal,
  mode = 'ADD',
  prefillData,
}: ModalProps) => {
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

  const initialValues = (_mode: ModalInputMode)  => {
    let values = {
      description: '',
      name: '',
    };

    if (_mode === 'EDIT') {
      values = {
        description: prefillData.description,
        name: prefillData.name,
      };
    }

    return values;
  };


  const taxRateCreate = (i: any) => {};
  // TODO ADD update
  // const { taxRateUpdate } = useTaxRateUpdateOperation();
  const pickMutation = (_mode: ModalInputMode, formData: FormData) => {
    let mutation;
    const input = {
      description: formData.description,
      endDate: formData.endDate,
      name: formData.name,
      startDate: formData.startDate,
    };

    if (_mode === 'ADD') {
      mutation = taxRateCreate({ input });
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
      initialValues={initialValues(mode)}
      isOpen={isOpen}
      submitCallback={setMutation}
      submitText={submitText(mode)}
    />
  );
};

export default SaleCycleModalWrapper;
