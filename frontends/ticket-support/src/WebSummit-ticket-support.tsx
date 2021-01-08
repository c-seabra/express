import './set-public-path'

import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'

import App from './components/app/App'

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: props => <App {...props} token="eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3ZWJzdW1taXQiLCJhZG1pbiI6dHJ1ZSwic3ViIjoiZjNjZGYwNTEtMGQzNy00Mjk5LWI0NmItMWJiNDQyMmY0ZDJjIiwiYWRtaW5fZW1haWwiOiJwYXdlbC5wYXJhZmluaXVrQG5ldGd1cnUuY29tIiwiY29uZl9pZCI6ImMzYTdmNDZmLWQyNjktNDZkMi1iZTMxLTA1Y2E3NzMzMDg4NiIsImNvbmZfc2x1ZyI6IndzMjAifQ.9YBHDBYDNS3qd76s7NaOdyK3AUjDHe9vKv5EYyjR_A8" />,})

export const { bootstrap, mount, unmount, update } = lifecycles
