export const isServer = typeof window === 'undefined'
export const isBrowser = !isServer

const noopGetInitialProps = async () => {
  await Promise.resolve()
  return { pageProps: {} }
}

export const disableStaticPageGeneration = page => {
  page.getInitialProps = noopGetInitialProps
}
