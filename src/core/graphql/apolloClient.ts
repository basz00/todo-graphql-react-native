import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const graphQLUri = process.env.EXPO_PUBLIC_GRAPHQL_URI || "";
const graphQLWsUri = process.env.EXPO_PUBLIC_GRAPHQL_WS_URI || "";

const httpLink = new HttpLink({ uri: graphQLUri });
const wsLink = new GraphQLWsLink(createClient({ url: graphQLWsUri }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
