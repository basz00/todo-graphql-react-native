import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as themeColors } from "@/core/ui/theme/colors";

interface Props {
  title: string;
  note: string;
  createdAt: string;
  onPress: () => void;
}

const NoteCard = ({ title, note, createdAt, onPress }: Props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
    >
      {title && (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      )}
      {note && (
        <Text style={styles.note} numberOfLines={2} ellipsizeMode="tail">
          {note}
        </Text>
      )}
      {createdAt && (
        <Text style={styles.date}>
          {new Date(createdAt).toLocaleDateString()}
        </Text>
      )}
    </Pressable>
  );
};

const makeStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background.default,
      padding: 16,
      borderRadius: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.neutral.black,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
      color: colors.text.primary,
    },
    note: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 4,
    },
    date: {
      fontSize: 12,
      color: colors.text.disabled,
    },
  });

export default NoteCard;
