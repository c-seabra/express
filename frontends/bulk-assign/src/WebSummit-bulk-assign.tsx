import './set-public-path'
import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import App from './components/app/App'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (props) => (
    <App {...props} token="12345"/>
  ),
  errorBoundary(err, info, props) {
    return null;
  },
})

export const { bootstrap, mount, unmount, update } = lifecycles
