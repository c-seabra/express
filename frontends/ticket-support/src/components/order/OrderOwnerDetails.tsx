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
import OrderUpdateOwnerDetailsModal from './OrderUpdateOwnerDetailsModal';

type OrderOwnerDetailsProps = {
  accountId?: string;
  closeEditMode?: any;
  editModeOn?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  orderRef: string;
  refetch?: any;
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

const StyledFieldset = styled.fieldset`
  border: none;
`;

const OrderOwnerDetails = ({
  accountId,
  firstName,
  lastName,
  email,
  editModeOn = false,
  renderActions,
  closeEditMode,
  orderRef,
  refetch,
}: OrderOwnerDetailsProps): ReactElement => {
  const [formControls, setFormControls] = useState<
    | {
        boundReset?: () => void;
        boundSubmit?: (event?: FormEvent) => void;
      }
    | undefined
  >();

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

  const {
    openModal: openOrderDetailsUpdateModal,
    isOpen: isOrderDetailsUpdateModalOpen,
    closeModal: closeOrderDetailsUpdateModal,
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
        onSubmit={(values) => {
          console.log('OrderOwnerDetails', values);
          if (email !== values.email) {
            openOrderTransferModal();
          } else if (
            firstName !== values.firstName ||
            lastName !== values.lastName
          ) {
            openOrderDetailsUpdateModal();
          }
        }}
      >
        {({ values, submitForm, resetForm }) => {
          // Binding submit form to submit programmatically from outside the <Formik> component
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm });
          }

          return (
            <Form>
              <StyledFieldset disabled={!editModeOn}>
                <OrderTransferModal
                  closeModal={closeOrderTransferModal}
                  email={values.email || ''}
                  firstName={values?.firstName || ''}
                  isOpen={isOrderTransferModalOpen}
                  lastName={values.lastName}
                  orderRef={orderRef}
                  refetch={refetch}
                />

                <OrderUpdateOwnerDetailsModal
                  accountId={accountId as string}
                  closeModal={closeOrderDetailsUpdateModal}
                  firstName={values?.firstName as string}
                  isOpen={isOrderDetailsUpdateModalOpen}
                  lastName={values.lastName}
                  orderRef={orderRef}
                  refetch={refetch}
                />

                <OwnerDetails>
                  <TextInputField label="First name" name="firstName" />
                  <TextInputField label="Last name" name="lastName" />
                  <TextInputField label="Email" name="email" />
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
              </StyledFieldset>
            </Form>
          );
        }}
      </Formik>
    </ContainerCard>
  );
};

export default OrderOwnerDetails;
