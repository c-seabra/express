import { meaningOfLife } from '@websummit/ws-lib-example';
import React from 'react';

export default function Root(props: any) {
  const { name } = props;
  return (
    <section>
      {name} is mounted with {meaningOfLife}!<h2>props:</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </section>
  );
}
