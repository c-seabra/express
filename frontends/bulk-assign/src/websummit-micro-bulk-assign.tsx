import './set-public-path'
import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import App from './components/app/App'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (props) => (
    <App {...props} />
  )
})

export const { bootstrap, mount, unmount, update } = lifecycles
