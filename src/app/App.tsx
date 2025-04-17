import React from "react";
import { ThemeProvider } from "@/core/ui/theme/ThemeContext";
import { ToastProvider } from "@/core/toast/ToastContext";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "@/navigation/RootStack";

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
