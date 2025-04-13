import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as themeColors } from "@/core/ui/theme/colors";

type Props = {
  title?: string;
  note?: string;
  onChange: (values: { title: string; note: string }) => void;
};

const NoteInputCard = ({ title = "", note = "", onChange }: Props) => {
  const { colors } = useTheme();

  const styles = makeStyles(colors);
  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        // placeholderTextColor={colors.text.disabled}
        value={title}
        onChangeText={(text) => onChange({ title: text, note })}
      />
      <TextInput
        style={[styles.input, styles.noteInput]}
        placeholder="Note..."
        // placeholderTextColor={colors.text.disabled}
        value={note}
        onChangeText={(text) => onChange({ title, note: text })}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
};

const makeStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    card: {
      // backgroundColor: colors.background.paper,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      // borderColor: colors.neutral.black,
    },
    input: {
      fontSize: 16,
      // color: colors.text.primary,
      marginBottom: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      // borderBottomColor: colors.neutral.black,
    },
    noteInput: {
      fontSize: 14,
      // color: colors.text.primary,
      minHeight: 100,
      textAlignVertical: "top",
    },
  });

export default NoteInputCard;
