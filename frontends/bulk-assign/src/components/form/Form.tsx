import React, { useState, useContext } from 'react';
import Upload from '../upload/Upload';
import { AppContext, AssigneesList } from '../app/App';
import styled from 'styled-components';

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

const Form: React.FC = () => {
  const { setAssigneesList } = useContext(AppContext);
  const [formError, setFormError] = useState(false);
  const [assignees, setAssignees] = useState<AssigneesList>([]);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignees && assignees.length > 0 && setAssigneesList) {
      setAssigneesList(assignees);
    } else {
      setFormError(true);
    }
  };
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      {formError && <div>There seems to be an error with your input.</div>}
      <Upload setAssignees={setAssignees} />
      <SubmitButton type="submit">Submit</SubmitButton>
    </form>
  );
};

export default Form;
