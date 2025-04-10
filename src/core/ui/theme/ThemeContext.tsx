import React, { createContext, useContext } from 'react';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

const theme = {
  colors,
  spacing,
  typography,
};

const ThemeContext = createContext(theme);

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
