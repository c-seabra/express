import React from 'react'
import styled, { keyframes } from 'styled-components'
import Loading from '../../lib/svgs/Loading'


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
  return <Rotate><Loading  /></Rotate>
}

export default Loader
