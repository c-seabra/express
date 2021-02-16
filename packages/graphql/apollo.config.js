const GRAPHQL_API_URL =
  process.env.GRAPHQL_API_URL || 'https://catalyst.cluster.cilabs.net/graphql';
const isLocal = !!/localhost|lvh\.me/.exec(GRAPHQL_API_URL);

module.exports = {
  client: {
    includes: ['./src/operations/**/*.ts'],
    service: {
      name: 'glue',
      skipSSLValidation: isLocal,
      url: GRAPHQL_API_URL,
    },
  },
};
