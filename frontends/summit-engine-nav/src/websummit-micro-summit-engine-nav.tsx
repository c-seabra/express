import { SingleSpaAppProps } from '@websummit/glue/src/@types/single-spa';
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import App from './components/App';

const lifecycles = singleSpaReact<SingleSpaAppProps>({
  React,
  ReactDOM,
  rootComponent: (props) => <App {...props} />,
});

export const { bootstrap, mount, unmount, update } = lifecycles;
