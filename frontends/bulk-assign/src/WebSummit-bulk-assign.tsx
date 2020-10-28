import "./set-public-path";
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./components/app/App"

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (props) => (
    <App {...props} token="eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3ZWJzdW1taXQiLCJqdGkiOiIwMGJlZTY3OS1jZDE0LTQwZWUtYTc3Yi0wZTI1NmQyNjgxNTQiLCJpYXQiOjE2MDM4MDk2NTYsImV4cCI6MTYwNDQxNDQ1NiwiZW1haWwiOiJ0b21pc2xhdi5zdmVjYWtAd2Vic3VtbWl0LmNvbSIsImNvbmZfc2x1ZyI6InJjMjEiLCJzZXJ2ZXIiOiJ0aWNrZXQtYXNzaWdubWVudCJ9.hy7W1DN7C7A2ItcqtrpuWHPXm9xZUipvdDvdGY0s2_I"/>
  ),
  errorBoundary(err, info, props) {
    return null;
  },
})

export const { bootstrap, mount, unmount, update } = lifecycles;
