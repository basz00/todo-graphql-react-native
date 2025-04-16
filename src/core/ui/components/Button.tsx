import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import {
  colors as colorTokens,
  spacing as spacingTokens,
} from "@/core/ui/theme";

interface Props {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
}

const Button = ({ children, onPress, style }: Props) => {
  const { colors, spacing } = useTheme();
  const styles = makeStyles(colors, spacing);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

const makeStyles = (
  colors: typeof colorTokens,
  spacing: typeof spacingTokens
) =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primary.heavy,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colors.secondary.base,
      fontSize: 16,
      fontWeight: "500",
    },
  });

export default Button;
