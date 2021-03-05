import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { AppContext, TicketList } from '../app/App';
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
  const { setTicketsList, staffList } = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [assignees, setAssignees] = useState<TicketList>([]);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignees && assignees.length > 0 && setTicketsList) {
      setTicketsList(assignees);
    } else {
      setFormError(true);
    }
  };
  const onSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const email: string = e.target.email.value.toLowerCase().trim();

    console.log(email);
    if (setTicketsList && staffList) {
      let staff = staffList[email];
      if (!staff) {
        const name = email.split('@')[0];
        const [firstName, lastName] = name.split('.');
        staff = {
          email,
          firstName: capitalizeFirstLetter(firstName),
          lastName: capitalizeFirstLetter(lastName),
        };
      }
      console.log(email, JSON.stringify(staff));
      setTicketsList([staff]);
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
