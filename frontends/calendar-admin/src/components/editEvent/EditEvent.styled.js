import { Button } from '@websummit/components/src/atoms/Button';
import styled from 'styled-components';

export const Form = styled.form`
  margin: 50px;
  display: flex;
  flex-wrap: wrap;
`;

export const FormLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  width: 20%;
`;

export const FormInput = styled.input`
  margin-left: 50px;
  margin-bottom: 40px;
  width: 60%;
  height: 30px;
`;

export const FormSelect = styled.select`
  margin-left: 50px;
  margin-bottom: 40px;
  width: 60%;
  height: 30px;
`;

export const FormTextArea = styled.textarea`
  margin-left: 50px;
  margin-bottom: 40px;
  width: 60%;
`;

export const FormWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const FormEditInvitee = styled.div`
  width: 250px;
  max-width: 100%;
`;

export const StyledButton = styled(Button)`
  padding: 0.5rem 1.2rem;
  margin-right: 1rem;
  bottom: 5%;
  position: static;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 1.5rem;
`;

export const OverlayButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OverlayButton = styled.div`
  color: #3e3d44;
  border: 1px solid #cecece;

  &:hover {
    background: #3e3d44;
  }

  &:first-child {
    margin-left: 0;
  }
`;
