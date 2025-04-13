import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as colorTokens } from "@/core/ui/theme/colors";
import React, { ReactNode } from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

type Props = {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  style?: Pick<
    ViewStyle,
    | "gap"
    | "padding"
    | "paddingTop"
    | "paddingBottom"
    | "paddingStart"
    | "paddingEnd"
  >;
};

const Card = ({ header, content, footer, style }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.card}>
      <View style={style}>
        {header}
        {content}
        {footer}
      </View>
    </View>
  );
};

const makeStyles = (colors: typeof colorTokens) =>
  StyleSheet.create({
    card: {
      backgroundColor: colors.background[60],
      borderRadius: 12,
    },
  });

export default Card;
