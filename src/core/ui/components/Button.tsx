import React, { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import {
  colors as colorTokens,
  spacing as spacingTokens,
} from "@/core/ui/theme";

interface Props {
  children: ReactNode;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const Button = ({ children, onPress, loading, disabled, style }: Props) => {
  const { colors, spacing } = useTheme();
  const styles = makeStyles(colors, spacing);

  const renderLoading = () => (
    <ActivityIndicator
      color={colors.secondary.base}
      size="small"
      style={styles.loading}
    />
  );

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        style,
        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? renderLoading() : children}
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
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xl,
      borderRadius: spacing.xs,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: colors.secondary.base,
      fontSize: spacing.md,
      fontWeight: "500",
    },
    disabled: {
      opacity: 0.5,
    },
    loading: {
      marginVertical: spacing["3xs"],
    },
  });

export default Button;
