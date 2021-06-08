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

const useTicketCategoryMutations = () => {
  const { slug, token } = useAppContext();
  const context = {
    slug,
    token,
  };
  const { success, error } = useSnackbars();

  const [createTicketCategory] = useCommerceCreateCategoryMutation({
    context,
    onCompleted: () => success('Ticket category created'),
    onError: (e) => error(e.message),
    refetchQueries: [{ context, query: COMMERCE_LIST_CATEGORIES }],
  });

  const [updateTicketCategory] = useCommerceUpdateCategoryMutation({
    context,
    onCompleted: () => success('Ticket category updated'),
    onError: (e) => error(e.message),
    refetchQueries: [{ context, query: COMMERCE_LIST_CATEGORIES }],
  });

  return { createTicketCategory, updateTicketCategory };
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
});

type TicketCategoryModalProps = Pick<
  ModalProps,
  'isOpen' | 'onRequestClose'
> & {
  ticketCategory?: Partial<CommerceCategory>;
};

const TicketCategoryModal = ({
  isOpen,
  onRequestClose,
  ticketCategory,
}: TicketCategoryModalProps) => {
  const {
    createTicketCategory,
    updateTicketCategory,
  } = useTicketCategoryMutations();

  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        enableReinitialize
        initialValues={{
          active: ticketCategory?.active,
          description: ticketCategory?.description,
          name: ticketCategory?.name || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (ticketCategory?.id) {
            await updateTicketCategory({
              variables: { id: ticketCategory?.id, input: values },
            });
          } else {
            await createTicketCategory({
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
                {ticketCategory?.id ? 'Edit' : 'Add'}&nbsp;ticket category
              </HeaderText>
            </Spacing>
          </Wrapper>
          <FormWrapper>
            <TextInputField required label="Category name" name="name" />
            <TextAreaField label="Description" name="description" />
            <CheckboxField label="Active" name="active" />
          </FormWrapper>
          <Modal.DefaultFooter
            submitText="Save ticket category"
            onCancelClick={onRequestClose}
          />
        </Form>
      </Formik>
    </Modal>
  );
};

export default TicketCategoryModal;
