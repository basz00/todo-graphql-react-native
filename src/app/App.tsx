import React from "react";
import { ThemeProvider } from "@/core/ui/theme/ThemeContext";
import { ToastProvider } from "@/core/toast/ToastContext";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "@/navigation/RootStack";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/core/graphql";

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ApolloProvider client={apolloClient}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </ApolloProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
