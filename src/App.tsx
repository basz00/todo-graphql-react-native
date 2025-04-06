import { View, Text } from "react-native";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/core/graphql";
import Dummy from "./Dummy";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Dummy />
    </ApolloProvider>
  );
};

export default App;
