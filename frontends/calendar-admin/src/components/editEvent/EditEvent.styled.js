import { Button } from '@websummit/components/src/atoms/Button';
import styled from 'styled-components';

export const Form = styled.form`
  margin: 20px;
  margin-left: 20%;
  display: flow-root;
`;

export const FormLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  float: left;
  clear: left;
  text-align: left;
  width: 100px;
`;

export const FormInput = styled.input`
  margin-left: 50px;
  margin-bottom: 40px;
  display: inline-block;
  float: left;
  width: 200px;
  height: 30px;
`;

export const FormTextArea = styled.textarea`
  margin-left: 50px;
  margin-bottom: 40px;
  display: inline-block;
  float: left;
  width: 200px;
`;

export const FormEditInvitee = styled.div`
  width: 250px;
  max-width: 100%;
`;

export const StyledButton = styled(Button)`
  padding: 0.5rem 1.2rem;
  margin-right: 1rem;
  float: right;
  bottom: 5%;
  position: sticky;
`;
