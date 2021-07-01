import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  TicketQuery,
  TicketType,
  useTicketUpdateMutation,
} from '@websummit/graphql/src/@types/operations';
import { GetQueryResult } from '@websummit/graphql/src/lib/types';
import Ticket from '@websummit/graphql/src/operations/queries/Ticket';
import { useRequestContext } from '@websummit/graphql/src/utils/AppContext';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Icon from '../../lib/components/atoms/Icon';
import { WarningMessage } from '../../lib/components/atoms/Messages';
import {
  AlertText,
  HeaderText,
  IconWrapper,
} from '../../lib/components/molecules/ReasonAlertModal';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem;
  width: 500px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const StyledAlertText = styled(AlertText)`
  display: flex;
  justify-content: center;
`;

const StyledWarningMessage = styled(WarningMessage)`
  margin-bottom: 2.5rem;

  & > span {
    font-weight: 600;
  }
`;

type TicketTypes = Pick<TicketType, 'id' | 'name'>[];

type ChangeTicketTypeModalProps = Pick<
  ModalProps,
  'isOpen' | 'onRequestClose'
> & {
  bookingRef?: string;
  ticket?: GetQueryResult<TicketQuery, 'ticket'>;
  ticketTypes?: TicketTypes;
};

const validationSchema = Yup.object().shape({
  reason: Yup.string().required('Please provide a reason for the change'),
  ticketType: Yup.string().required('Please provide a ticket type'),
});

const getTicketTypesOptions = (ticketTypes: TicketTypes = []) =>
  ticketTypes
    ?.map((ticketType) => ({
      label: ticketType?.name || '',
      value: ticketType?.id || '',
    }))
    .filter((option) => option?.value);

const useUpdateTicketType = ({ bookingRef }: { bookingRef?: string }) => {
  const context = useRequestContext();
  const { error, success } = useSnackbars();
  const [updateTicket] = useTicketUpdateMutation({
    context,
    onCompleted: () => success('Ticket type updated'),
    onError: (e) => error(e.message),
    refetchQueries: [
      {
        context,
        query: Ticket,
        variables: {
          reference: bookingRef,
        },
      },
    ],
  });

  return async (newTicketTypeId: string, reason: string) => {
    await updateTicket({
      context: {
        ...context,
        headers: {
          'x-reason': reason,
        },
      },
      variables: {
        input: { reference: bookingRef || '', typeId: newTicketTypeId },
      },
    });
  };
};

const ChangeTicketTypeModal = ({
  isOpen,
  onRequestClose,
  ticket,
  ticketTypes,
}: ChangeTicketTypeModalProps) => {
  const ticketTypesOptions = getTicketTypesOptions(ticketTypes);

  const updateTicketType = useUpdateTicketType({
    bookingRef: ticket?.bookingRef,
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          reason: '',
          ticketType: ticket?.ticketType?.id || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await updateTicketType(values.ticketType, values.reason);
          onRequestClose();
        }}
      >
        <StyledForm>
          <Header>
            <Spacing bottom="10px">
              <IconWrapper>
                <Icon>error</Icon>
              </IconWrapper>
            </Spacing>

            <HeaderText>Change ticket type</HeaderText>
          </Header>

          <Spacing bottom="40px">
            <StyledAlertText />
          </Spacing>

          <SelectField
            required
            label="Select ticket type"
            name="ticketType"
            options={ticketTypesOptions}
          />

          <TextInputField required label="Reason for change" name="reason" />

          <StyledWarningMessage>
            The above change has <span>monetary implications</span>. Contact
            finance to facilitate upgrade/refund payment.
          </StyledWarningMessage>

          <Modal.DefaultFooter red onCancelClick={onRequestClose} />
        </StyledForm>
      </Formik>
    </Modal>
  );
};

export default ChangeTicketTypeModal;
