import { ApolloError } from '@apollo/client';
import Icon from '@websummit/components/src/atoms/Icon';
import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceTag,
  useCommerceCreateTagMutation,
  useCommerceUpdateTagMutation,
} from '@websummit/graphql/src/@types/operations';
import CommerceListTags from '@websummit/graphql/src/operations/queries/CommerceListTags';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useRequestContext } from '../app/AppContext';

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

const useTagMutations = () => {
  const context = useRequestContext();
  const { success, error } = useSnackbars();

  const refetchQueries = [{ context, query: CommerceListTags }];
  const onError = (e: ApolloError) => error(e.message);

  const [createTag] = useCommerceCreateTagMutation({
    context,
    onCompleted: () => success('Tag created'),
    onError,
    refetchQueries,
  });
  const [updateTag] = useCommerceUpdateTagMutation({
    context,
    onCompleted: () => success('Tag updated'),
    onError,
    refetchQueries,
  });

  return {
    createTag,
    updateTag,
  };
};

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
  name: Yup.string().required('Name is required'),
});

type TagModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  tag?: Pick<CommerceTag, 'id' | 'name' | 'code' | 'description'>;
};

const TagModal = ({ isOpen, onRequestClose, tag }: TagModalProps) => {
  const { createTag, updateTag } = useTagMutations();

  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        enableReinitialize
        initialValues={{
          code: tag?.code || '',
          description: tag?.description,
          name: tag?.name || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (tag?.id) {
            // Code should not be updated so we are taking it out here
            const { code, ...restValues } = values;
            await updateTag({
              variables: { commerceTagUpdate: restValues, id: tag?.id },
            });
          } else {
            await createTag({
              variables: {
                commerceTagCreate: values,
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
              <HeaderText>{tag?.id ? 'Edit' : 'Add'}&nbsp;tag</HeaderText>
            </Spacing>
          </Wrapper>
          <FormWrapper>
            <TextInputField required label="Tag name" name="name" />
            <TextInputField
              disabled={Boolean(tag?.id)}
              // Code should not be edited after creation
              label="Tag code"
              name="code"
              required={!tag?.id}
            />
            <TextAreaField label="Description" name="description" />
          </FormWrapper>
          <Modal.DefaultFooter
            submitText="Save"
            onCancelClick={onRequestClose}
          />
        </Form>
      </Formik>
    </Modal>
  );
};

export default TagModal;
