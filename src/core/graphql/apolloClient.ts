import { ApolloClient, InMemoryCache } from "@apollo/client";

const graphqlUri = process.env.EXPO_PUBLIC_GRAPHQL_URI;

const apolloClient = new ApolloClient({
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

export default apolloClient;
