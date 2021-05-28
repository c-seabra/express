import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const ItemIcon = styled.div`
  width: 20px;

  & svg {
    width: 100%;
  }
`;

export const ItemChildren = styled.div`
  padding: 0;
  margin: 0;
  width: calc(100% - 42px);
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 0.25rem;
`;

export const Date = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

export const UserRsvp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #3e3d44;
  padding: 1.5rem;
  color: white;
  height: 85px;

  .userRsvp_button {
    transition: all 0.4s ease;
    padding: 0.5rem 1.2rem;
    background: none;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin-left: 5px;
  }

  .userRsvp_button:hover {
    background: #fa7e23;
    color: #fff;
    cursor: pointer;
  }

  .button_active {
    background: #fa7e23;
  }

  .button_active:hover {
    cursor: default;
  }
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

export const OverlayButtonYes = styled.div`
  background: #fa7e23;
  border-color: #fa7e23;
  color: white;

  &:hover {
    background: red;
  }
`;

export const FormWrap = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  left: 0;
  width: 100%;
`;

export const PopupContainer = styled.div`
  height: 80%;
  width: 70%;
  position: relative;
  background-color: white;
  color: #3e3d44;
  border-radius: 4px;
  overflow: auto;
  overflow-x: hidden;
  top: 10%;
  align-self: center;
  z-index: 10;
  -webkit-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:hover {
    cursor: default;
  }
`;

export const PopupHeading = styled.div`
  background-color: #4688d9;
  height: 30px;
  justify-content: center;
  display: flex;
  padding-top: 6px;
  color: white;
  font-size: 16px;
`;
