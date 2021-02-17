import React from 'react';
import ReactDom from 'react-dom';
import { meaningOfLife } from '@websummit/ws-lib-example';

export default function Root(props: any) {
  return (
    <section>
      {props.name} is mounted with {meaningOfLife}!<h2>props:</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </section>
  );
}
