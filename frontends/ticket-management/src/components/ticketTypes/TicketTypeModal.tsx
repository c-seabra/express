import Icon from '@websummit/components/src/atoms/Icon';
import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceCategory,
  CommerceTax,
  CommerceTaxType,
  Maybe,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import TicketTypeForm from '../organisms/TicketTypeForm';

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

type TicketGroupModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  country?: string;
  currencySymbol?: string;
  taxTypes: Maybe<
    Array<
      { __typename?: 'CommerceTaxType' } & Pick<
        CommerceTaxType,
        'id' | 'name' | 'description'
      > & {
          taxes: Maybe<
            Array<
              { __typename?: 'CommerceTax' } & Pick<
                CommerceTax,
                'id' | 'country' | 'name' | 'rateAmount' | 'rateType'
              >
            >
          >;
        }
    >
  >;
  ticketCategories: Partial<CommerceCategory>[];
};

const TicketTypeModal = ({
  country,
  currencySymbol,
  isOpen,
  onRequestClose,
  taxTypes = [],
  ticketCategories = [],
}: TicketGroupModalProps) => {
  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Wrapper>
        <Spacing bottom="10px">
          <IconWrapper>
            <Icon>info</Icon>
          </IconWrapper>
        </Spacing>

        <Spacing bottom="40px">
          <HeaderText>Create a ticket type</HeaderText>
        </Spacing>
      </Wrapper>
      <TicketTypeForm
        country={country}
        currencySymbol={currencySymbol}
        taxTypes={taxTypes}
        ticketCategories={ticketCategories}
        onCancelClick={onRequestClose}
      />
    </Modal>
  );
};

export default TicketTypeModal;
