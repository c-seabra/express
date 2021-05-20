import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import {
  CreateOrderWorkUnit,
  defaultStatus,
  transformStaffIntoWorkUnit,
} from '../../lib/extract/createOrder';
import { AppContext, Staff, StaffTicketContext, TicketList } from '../app/App';
import Upload from '../upload/Upload';

const SubmitButton = styled.button`
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

function capitalizeFirstLetter(input: string) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const Form: React.FC = () => {
  const context = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [assignees, setAssignees] = useState<TicketList>([]);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignees && assignees.length > 0 && context.setTicketsList) {
      context.setTicketsList(assignees);
    } else {
      setFormError(true);
    }
  };
  const onSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // some hackery because ts is not smart enough for this type to work
    const emailField = (e.target as any).email.value as string;
    const email: string = emailField.toLowerCase().trim();

    if (context.setTicketsList && context.staffList) {
      let staff = context.staffList[email];
      if (!staff) {
        const name = email.split('@')[0];
        const [firstName, lastName] = name.split('.');
        staff = {
          email,
          firstName: capitalizeFirstLetter(firstName),
          lastName: capitalizeFirstLetter(lastName),
        };
      }

      const workUnit = transformStaffIntoWorkUnit(context, staff);
      context.setTicketsList([workUnit]);
    } else {
      setFormError(true);
    }
  };
  return (
    <>
      <form onSubmit={(e) => onSingleSubmit(e)}>
        {formError && <div>There seems to be an error with your input.</div>}
        <input name="email" type="text" />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      <form onSubmit={(e) => onSubmit(e)}>
        {formError && <div>There seems to be an error with your input.</div>}
        <Upload setAssignees={setAssignees} />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </>
  );
};

export default Form;
