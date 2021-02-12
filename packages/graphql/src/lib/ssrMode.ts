/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable no-param-reassign */
import { NextPage } from 'next';

export const isServer = typeof window === 'undefined';
export const isBrowser = !isServer;

const noopGetInitialProps = async () => {
  await Promise.resolve();
  return { pageProps: {} };
};

export const disableStaticPageGeneration = (page: NextPage) => {
  page.getInitialProps = noopGetInitialProps;
};
