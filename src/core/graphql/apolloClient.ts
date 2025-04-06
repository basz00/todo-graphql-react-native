import { ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const graphqlUri = Constants.expoConfig?.extra?.graphqlUri;

const apolloClient = new ApolloClient({
  uri: graphqlUri,
  cache: new InMemoryCache(),
});

export default apolloClient;
