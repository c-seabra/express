# Development

- run `yarn && yarn dev`
- Go to http://single-spa-playground.org/playground/instant-test?name=@WebSummit/investor-portal&url=8500 to see it working!

# Project info

## Local setup to work with Catalyst

To use your local version of **Catalyst** for development replace **GRAPHQL_API_URL** on line 6 in [apolloClient.js](./src/lib/apollo/apolloClient.js#L6) to point to `http://localhost:4040/graphql`.

You will need a `ws20` Bearer token for the app to work with **Catalyst** as the default `conf_slug` is set to `ws20`. Once you have this

(this will soon be fixed and is added in a root `.env` file :D )
~you can replace the temp token on line 12 in [websummit-micro-investor-portal.tsx](src/websummit-micro-investor-portal.tsx#L12).~
