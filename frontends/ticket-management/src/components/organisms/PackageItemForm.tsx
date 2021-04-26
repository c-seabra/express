import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import Modal from '@websummit/components/src/molecules/Modal';
import MoneyInputField from '@websummit/components/src/molecules/MoneyInputField';
import SelectField from '@websummit/components/src/molecules/SelectField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { CommerceDealItemType } from '@websummit/graphql/src/@types/operations';
import { Form } from 'formik';
import React from 'react';
import styled from 'styled-components';

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PackageItemForm = ({
  currencySymbol,
  productOptions,
  priceTypeOptions,
  closeModal,
  values,
}: any) => {
  const isAbsoluteValue =
    values.type === CommerceDealItemType.AbsoluteDiscount ||
    values.type === CommerceDealItemType.AbsolutePrice;
  const isPercentageValue =
    values.type === CommerceDealItemType.PercentageDiscount;

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
              label="Min ticket qty."
              min={1}
              name="min"
              step={1}
              type="number"
            />
            <TextInputField
              required
              label="Max ticket qty."
              min={1}
              name="max"
              step={1}
              type="number"
            />
            <TextInputField
              required
              label="Step sale"
              min={1}
              name="step"
              step={1}
              type="number"
            />
          </InlineWrapper>
        </FieldWrapper>
        <FieldWrapper>
          {isPercentageValue && (
            <TextInputField
              required
              label="Percentage"
              max={100}
              min={1}
              name="amount"
              step={1}
              type="number"
            />
          )}
          {isAbsoluteValue && (
            <MoneyInputField
              required
              currencySymbol={currencySymbol}
              label="Amount"
              name="amount"
            />
          )}
        </FieldWrapper>
        <FieldWrapper>
          <Spacing bottom="8px">
            <SelectField
              required
              label="Pricing applied"
              name="type"
              options={priceTypeOptions}
            />
          </Spacing>
        </FieldWrapper>
      </Spacing>

      <Spacing top="48px">
        <FieldWrapper>
          <Modal.DefaultFooter submitText="Save" onCancelClick={closeModal} />
        </FieldWrapper>
      </Spacing>
    </Form>
  );
};

export default PackageItemForm;
