import { Form, Formik } from 'formik';
import React, { FormEvent, ReactElement, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, SecondaryButton } from '../../lib/components/atoms/Button';
import ContainerCard from '../../lib/components/atoms/ContainerCard';
import { useModalState } from '../../lib/components/molecules/Modal';
import TextInputField from '../../lib/components/molecules/TextInputField';
import { Spacing } from '../../lib/components/templates/Spacing';
import STATIC_MESSAGES from '../../lib/constants/messages';
import OrderTransferModal from './OrderTransferModal';

type OrderOwnerDetailsProps = {
  closeEditMode?: any;
  editModeOn?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  orderRef: string;
  renderActions?: () => ReactElement;
};

const OwnerDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  & > div {
    min-width: 30%;
    margin-bottom: 8px;
  }
`;

const StyledActions = styled(Spacing)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const OrderOwnerDetails = ({
  firstName,
  lastName,
  email,
  editModeOn = false,
  renderActions,
  closeEditMode,
  orderRef,
}: OrderOwnerDetailsProps): ReactElement => {
  const [formControls, setFormControls] = useState<
    | {
        boundReset?: () => void;
        boundSubmit?: (event?: FormEvent) => void;
      }
    | undefined
  >();

  const handleClose = () => {
    if (formControls?.boundReset) {
      formControls.boundReset();
    }

    setFormControls(undefined);
    // closeModal();
  };

  const confirmSchema = Yup.object().shape({
    email: Yup.string()
      .email(STATIC_MESSAGES.VALIDATION.EMAIL)
      .required(STATIC_MESSAGES.VALIDATION.REQUIRED),
    firstName: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
    lastName: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  });

  const {
    openModal: openOrderTransferModal,
    isOpen: isOrderTransferModalOpen,
    closeModal: closeOrderTransferModal,
  } = useModalState();

  return (
    <ContainerCard renderActions={renderActions} title="Owner details">
      <Formik
        initialValues={{
          email,
          firstName,
          lastName,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={confirmSchema}
        onSubmit={async (values) => {
          console.log('OrderOwnerDetails', values);
          if (email !== values.email) {
            openOrderTransferModal();
          } else if (firstName !== values.firstName || lastName !== values.lastName) {

          }

          // await mutationCallback(values);
          // handleClose();
        }}
      >
        {({ values, submitForm, resetForm }) => {
          // Binding submit form to submit programmatically from outside the <Formik> component
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm });
          }

          return (
            <Form>
              <OrderTransferModal
                closeModal={closeOrderTransferModal}
                isOpen={isOrderTransferModalOpen}
                orderRef={orderRef}
              />
              editModeOn: {Boolean(editModeOn).toString()}
              <br />
              values: {JSON.stringify(values)}
              <OwnerDetails>
                <TextInputField
                  disabled={!editModeOn}
                  label="First name"
                  name="firstName"
                />
                <TextInputField
                  disabled={!editModeOn}
                  label="Last name"
                  name="lastName"
                />
                <TextInputField
                  disabled={!editModeOn}
                  label="Email"
                  name="email"
                />
              </OwnerDetails>
              {editModeOn && (
                <StyledActions top="16px">
                  <Spacing right="16px">
                    <SecondaryButton onClick={closeEditMode}>
                      Cancel
                    </SecondaryButton>
                  </Spacing>
                  <Button type="submit" onClick={() => null}>
                    Save
                  </Button>
                </StyledActions>
              )}
            </Form>
          );
        }}
      </Formik>
    </ContainerCard>
  );
};

export default OrderOwnerDetails;
