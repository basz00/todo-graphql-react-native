import React from "react";
import { ThemeProvider } from "./core/ui/theme/ThemeContext";
import NoteList from "./features/note/list/presentation/NoteList";

const App = () => {
  return (
    <ThemeProvider>
      <NoteList />
    </ThemeProvider>
  );
};

export default App;
