import React from "react";
import { ThemeProvider } from "../core/ui/theme/ThemeContext";
import NoteList from "../features/note/list/presentation/ui/screens/NoteList";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigation/RootStack";

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
