import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as colorTokens } from "@/core/ui/theme/colors";
import { typography as typographyTokens } from "@/core/ui/theme/typography";
import { spacing as spacingTokens } from "@/core/ui/theme/spacing";
import { Card } from "@/core/ui/components";

interface Props {
  title: string;
  note: string;
  createdAt: string;
  onPress: () => void;
}

const NoteCard = ({ title, note, createdAt, onPress }: Props) => {
  const { colors, typography, spacing } = useTheme();
  const styles = makeStyles(colors, typography, spacing);

  const renderDate = () => {
    if (createdAt) {
      return <Text style={styles.date}>{createdAt}</Text>;
    }
    return null;
  };

  const renderTitle = () => {
    if (title) {
      return (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      );
    }
    return null;
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {renderDate()}
      {renderTitle()}
    </View>
  );

  const renderNote = () => {
    if (note) {
      return (
        <Text style={styles.note} numberOfLines={2} ellipsizeMode="tail">
          {note}
        </Text>
      );
    }
    return null;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
    >
      <Card
        header={renderHeader()}
        content={renderNote()}
        style={{ gap: 8, padding: 16 }}
      />
    </Pressable>
  );
};

const makeStyles = (
  colors: typeof colorTokens,
  typography: typeof typographyTokens,
  spacing: typeof spacingTokens
) =>
  StyleSheet.create({
    header: {
      gap: spacing["2xs"],
    },
    title: {
      fontSize: typography.size.md,
      fontWeight: "bold",
      color: colors.primary.heavy,
      marginBottom: spacing["2xs"],
    },
    note: {
      fontSize: typography.size.sm,
      color: colors.secondary.heavy,
      marginBottom: spacing["2xs"],
    },
    date: {
      fontSize: typography.size.xs,
      color: colors.secondary.robust,
    },
  });

export default NoteCard;
