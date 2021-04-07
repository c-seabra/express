import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: relative;
  background-color: white;
  color: #3e3d44;
  border-radius: 4px;
  overflow: hidden;
  position: absolute;
  top: 500px;
  left: 200px;
  z-index: 10;
  -webkit-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    cursor: default;
  }

  & * {
    font-size: 1em;
    box-sizing: border-box;
  }
`;

export const Button = styled.button`
  transition: all 0.4s ease;
  padding: 0.5rem 1.2rem;
  background: none;
  color: #3e3d44;
  border: none;
  border-radius: 4px;
  margin-left: 5px;

  &:hover {
    background: #fa7e23;
    color: white;
    cursor: pointer;
  }

  .button_active {
    background: #fa7e23;
  }

  .button_active:hover {
    cursor: default;
  }
`;

export const TopButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0.5rem;
`;

export const TopButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  outline: none;

  .topButton__active {
    background: #e2e2e2;
  }

  &:hover {
    cursor: pointer;
    background: #f1f1f1;
  }

  & svg {
    width: 18px;
  }

  & svg path,
  & svg rect {
    fill: #757575;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(32, 33, 36, 0.38);
  z-index: 5;
  pointer-events: 'auto';

  &:hover {
    cursor: pointer;
  }
`;
