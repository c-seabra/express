import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import {
  CommerceStore,
  useCommerceUpdateStoreMutation,
} from '@websummit/graphql/src/@types/operations';
import CommerceGetStore from '@websummit/graphql/src/operations/queries/CommerceGetStore';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';

import { useAppContext } from '../app/AppContext';

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  & > ${SecondaryButton} {
    margin-right: 1rem;
  }
`;

const ActivateStoreContainer = styled.div`
  margin: -1rem -1.8rem -2.8rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 3px solid #f1f1f1;
`;

const PaddedContainer = styled.div`
  padding: 1.2rem 1.8rem;
`;

type Props = {
  store?: Pick<CommerceStore, 'active' | 'id' | 'slug'> | null;
};

const ActivateStore = ({ store }: Props) => {
  const { success, error } = useSnackbars();
  const { token } = useAppContext();
  const [updateStore] = useCommerceUpdateStoreMutation({
    context: { token },
    onCompleted: () => success('Store updated'),
    onError: (e) => error(e.message),
    refetchQueries: [{ context: { token }, query: CommerceGetStore }],
  });

  return (
    <ActivateStoreContainer>
      <Formik
        enableReinitialize
        initialValues={{ active: store?.active }}
        onSubmit={async (values) => {
          if (store?.id) {
            await updateStore({
              variables: { id: store.id, input: { active: values.active } },
            });
          }
        }}
      >
        {({ resetForm }) => (
          <Form>
            <PaddedContainer>
              <CheckboxField label="Event sales active" name="active" />
            </PaddedContainer>
            <PaddedContainer>
              <ButtonsContainer>
                <SecondaryButton type="button" onClick={() => resetForm()}>
                  Cancel
                </SecondaryButton>
                <Button type="submit">Save changes</Button>
              </ButtonsContainer>
            </PaddedContainer>
            <Separator />
          </Form>
        )}
      </Formik>
    </ActivateStoreContainer>
  );
};

export default ActivateStore;
