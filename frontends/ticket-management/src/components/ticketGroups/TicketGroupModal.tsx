import Icon from '@websummit/components/src/atoms/Icon';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceCategory,
  useCommerceCreateCategoryMutation,
  useCommerceUpdateCategoryMutation,
} from '@websummit/graphql/src/@types/operations';
import COMMERCE_LIST_CATEGORIES from '@websummit/graphql/src/operations/queries/CommerceListCategories';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useAppContext } from '../app/AppContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 480px;
`;

const HeaderText = styled.div`
  color: #0067e9;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 40px;
    color: #0067e9;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const useTicketGroupMutations = () => {
  const { token } = useAppContext();
  const { success, error } = useSnackbars();

  const [createTicketGroup] = useCommerceCreateCategoryMutation({
    context: { token },
    onCompleted: () => success('Ticket group created'),
    onError: (e) => error(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_LIST_CATEGORIES }],
  });

  const [updateTicketGroup] = useCommerceUpdateCategoryMutation({
    context: { token },
    onCompleted: () => success('Ticket group updated'),
    onError: (e) => error(e.message),
    refetchQueries: [{ context: { token }, query: COMMERCE_LIST_CATEGORIES }],
  });

  return { createTicketGroup, updateTicketGroup };
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

type TicketGroupModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  ticketGroup?: Partial<CommerceCategory>;
};

const TicketGroupModal = ({
  isOpen,
  onRequestClose,
  ticketGroup,
}: TicketGroupModalProps) => {
  const { createTicketGroup, updateTicketGroup } = useTicketGroupMutations();

  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        enableReinitialize
        initialValues={{
          active: ticketGroup?.active,
          description: ticketGroup?.description,
          name: ticketGroup?.name || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (ticketGroup?.id) {
            await updateTicketGroup({
              variables: { id: ticketGroup?.id, input: values },
            });
          } else {
            await createTicketGroup({
              variables: {
                input: values,
              },
            });
          }

          onRequestClose();
        }}
      >
        <Form>
          <Wrapper>
            <Spacing bottom="10px">
              <IconWrapper>
                <Icon>info</Icon>
              </IconWrapper>
            </Spacing>

            <Spacing bottom="40px">
              <HeaderText>
                {ticketGroup?.id ? 'Edit' : 'Add'}&nbsp;ticket group
              </HeaderText>
            </Spacing>
          </Wrapper>
          <FormWrapper>
            <TextInputField required label="Group name" name="name" />
            <TextAreaField label="Description" name="description" />
            <CheckboxField label="Active" name="active" />
          </FormWrapper>
          <Modal.DefaultFooter
            submitText="Save ticket group"
            onCancelClick={onRequestClose}
          />
        </Form>
      </Formik>
    </Modal>
  );
};

export default TicketGroupModal;
