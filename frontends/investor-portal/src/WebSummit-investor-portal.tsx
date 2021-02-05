import './set-public-path'

import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'

import App from './components/app/App'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: props => (
    <App
      {...props}
      token="eyJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZX0.xPBCo7SxNuv-T9Tm6H4txw19UOAoj-CZOJF93WwrKX8"
    />
  ),
})
export const { bootstrap, mount, unmount, update } = lifecycles
