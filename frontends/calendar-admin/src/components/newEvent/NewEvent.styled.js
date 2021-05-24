import { Button } from '@websummit/components/src/atoms/Button';
import styled from 'styled-components';

export const CreatePopupHeading = styled.div`
  background-color: #4688d9;
  height: 30px;
  justify-content: center;
  display: flex;
  padding-top: 6px;
  color: white;
  font-size: 16px;
`;

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

export const CreateButton = styled(Button)`
  margin-right: 40px;
  float: right;
  bottom: 5%;
  position: sticky;
`;
