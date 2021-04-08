import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <svg
      height="24px"
      version="1.1"
      viewBox="0 0 24 24"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        fill="none"
        fillRule="evenodd"
        id="Icon-/-Refresh"
        stroke="none"
        strokeWidth="1"
      >
        <path
          d="M17.65,6.35 C16.2,4.9 14.21,4 12,4 C7.58,4 4.01,7.58 4.01,12 C4.01,16.42 7.58,20 12,20 C15.73,20 18.84,17.45 19.73,14 L17.65,14 C16.83,16.33 14.61,18 12,18 C8.69,18 6,15.31 6,12 C6,8.69 8.69,6 12,6 C13.66,6 15.14,6.69 16.22,7.78 L13,11 L20,11 L20,4 L17.65,6.35 Z"
          fill="#333333"
          id="Path"
        />
      </g>
    </svg>
  );
};

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Rotate = styled.div`
  animation: ${rotate} 2s linear infinite;
  transform-origin: center center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = () => {
  return (
    <Rotate>
      <Loading />
    </Rotate>
  );
};

export default Loader;
