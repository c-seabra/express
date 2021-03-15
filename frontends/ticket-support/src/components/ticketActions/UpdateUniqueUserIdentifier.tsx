import {
  SpacingBottom,
  SpacingBottomXs,
} from '@websummit/components/src/templates/Spacing';
import { Form, Formik } from 'formik';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Button, SecondaryButton } from '../../lib/components/atoms/Button';
import BoxMessage from '../../lib/components/molecules/BoxMessage';
import EditableTextInputField from '../../lib/components/molecules/EditableTextInputField';
import Modal, { useModalState } from '../../lib/components/molecules/Modal';
import STATIC_MESSAGES from '../../lib/constants/messages';
import UpdateUniqueUserIdentifierModal from './UpdateUniqueUserIdentifierModal';

const StyledActions = styled.span`
  display: flex;
  justify-content: flex-end;
`;

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 16px;
`;

const StyledLabel = styled.span`
  color: #091a46;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`;

type UpdateUniqueUserIdentifierProps = {
  accountId: string;
  email?: string;
  isDisabled?: boolean;
};

const confirmSchema = Yup.object().shape({
  email: Yup.string()
    .email(STATIC_MESSAGES.VALIDATION.EMAIL)
    .required(STATIC_MESSAGES.VALIDATION.REQUIRED),
});

const UpdateUniqueUserIdentifier = ({
  email,
  accountId,
  isDisabled = false,
}: UpdateUniqueUserIdentifierProps) => {
  const { isOpen, openModal, closeModal } = useModalState();
  const [editMode, setEditMode] = useState(false);

  const cancelAction = () => {
    setEditMode(false);
  };
  const editAction = () => {
    setEditMode(true);
  };
  const saveAction = () => {
    openModal();
  };

  const [formControls, setFormControls] = useState<
    | {
        boundReset?: () => void;
        boundSubmit?: (event?: FormEvent) => void;
      }
    | undefined
  >();

  return (
    <>
      <StyledLabel>Unique user identifier</StyledLabel>

      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={confirmSchema}
        onSubmit={() => {
          saveAction();
        }}
      >
        {({ values, submitForm, resetForm }) => {
          // Binding submit form to submit programmatically from outside the <Formik> component
          if (!formControls) {
            setFormControls({ boundReset: resetForm, boundSubmit: submitForm });
          }

          return (
            <Form>
              <EditableTextInputField
                required
                disabled={isDisabled}
                editModeOn={editMode}
                name="email"
                placeholder="Type email"
                value={email || 'N/A'}
                onEdit={editAction}
              />
              {editMode && (
                <>
                  <SpacingBottomXs>
                    <BoxMessage
                      backgroundColor="#F7F7F7"
                      color="#E15554"
                      type="error"
                    >
                      <>
                        This email is used as an user account email (unique user
                        identifier). Changing this field will impact their
                        profile data, calendar events and any associated event
                        related associations. Going forward logging into Ticket
                        Dashboard will use this new user account email.
                        <br />
                        This change will however <span>not impact</span> the App
                        login email which is used to log into our conference
                        apps.{' '}
                      </>
                    </BoxMessage>
                  </SpacingBottomXs>
                  <SpacingBottom>
                    <StyledActions>
                      <StyledSecondaryButton
                        onClick={() => {
                          resetForm();
                          cancelAction();
                        }}
                      >
                        Cancel
                      </StyledSecondaryButton>
                      <Button type="submit">Save</Button>
                      <Modal isOpen={isOpen} onRequestClose={closeModal} />
                      <UpdateUniqueUserIdentifierModal
                        accountId={accountId}
                        closeModal={() => {
                          closeModal();
                          cancelAction();
                          resetForm();
                        }}
                        email={values.email || 'N/A'}
                        isOpen={isOpen}
                      />
                    </StyledActions>
                  </SpacingBottom>
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UpdateUniqueUserIdentifier;
