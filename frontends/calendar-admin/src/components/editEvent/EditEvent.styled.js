import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const FormInput = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  & svg {
    width: 20px;
  }

  & input {
    width: calc(100% - 42px);
    padding: 0.5rem 0.7rem;
  }
`;

export const FormEditContent = styled.div`
  width: 450px;
  max-width: 100%;
  margin-right: 3rem;
`;

export const FormEditInvitee = styled.div`
  width: 250px;
  max-width: 100%;
`;

export const Button = styled.button`
  color: #3e3d44;
  border: 1px solid #cecece;
  transition: all 0.4s ease;
  padding: 0.5rem 1.2rem;
  background: white;
  border-radius: 4px;
  margin-left: 5px;

  &:hover {
    background: #fa7e23;
    color: #fff;
    cursor: pointer;
  }
`;
