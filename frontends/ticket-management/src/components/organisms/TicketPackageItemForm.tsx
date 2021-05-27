import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import Modal from '@websummit/components/src/molecules/Modal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { Form, FormikProps } from 'formik';
import React from 'react';
import styled from 'styled-components';

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

type TicketPackageItemFormProps = {
  closeModal: any;
  productOptions: any[];
  submitText: string;
} & FormikProps<any>;

const TicketPackageItemForm = ({
  productOptions,
  submitText,
  closeModal,
}: TicketPackageItemFormProps) => {
  return (
    <Form>
      <Spacing top="8px">
        <FieldWrapper>
          <SelectField
            required
            label="Ticket type"
            name="product"
            options={productOptions}
          />
        </FieldWrapper>

        <FieldWrapper>
          <InlineWrapper>
            <TextInputField
              required
              label="Quantity of tickets"
              min={1}
              name="quantity"
              step={1}
              type="number"
            />
          </InlineWrapper>
        </FieldWrapper>
      </Spacing>

      <Spacing top="48px">
        <FieldWrapper>
          <Modal.DefaultFooter
            submitText={submitText}
            onCancelClick={closeModal}
          />
        </FieldWrapper>
      </Spacing>
    </Form>
  );
};

export default TicketPackageItemForm;
