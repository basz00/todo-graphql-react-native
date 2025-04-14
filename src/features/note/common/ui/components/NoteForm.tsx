import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import {
  useTheme,
  colors as colorTokens,
  typography as typographyTokens,
  spacing as spacingTokens,
} from "@/core/ui/theme";
import { Divider } from "@/core/ui/components";

type Props = {
  title?: string;
  note?: string;
  updatedAt?: string;
  onChange: (values: { title: string; note: string }) => void;
};

const NoteForm = ({ title = "", note = "", updatedAt, onChange }: Props) => {
  const { colors, typography, spacing } = useTheme();

  const styles = makeStyles(colors, typography, spacing);

  const renderTitle = () => (
    <TextInput
      style={styles.titleInput}
      placeholder="Your Title Here..."
      value={title}
      numberOfLines={1}
      onChangeText={(text) => onChange({ title: text, note })}
    />
  );

  const renderCreatedBy = () => {
    return (
      <View style={styles.headerRowContainer}>
        <View style={styles.headerRowLabel}>
          <Text style={styles.headerRowLabelFont}>Created By</Text>
        </View>
        <View style={styles.headerRowContent}>
          <Text style={styles.headerRowContentFont}>User Isme</Text>
        </View>
      </View>
    );
  };

  const renderUpdatedAt = () => {
    return (
      <View style={styles.headerRowContainer}>
        <View style={styles.headerRowLabel}>
          <Text style={styles.headerRowLabelFont}>Last modified</Text>
        </View>
        <View style={styles.headerRowContent}>
          <Text style={styles.headerRowContentFont}>19 March 2021, 12:00</Text>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={{ gap: 12 }}>
      {renderTitle()}
      {/* {renderCreatedBy()}
      {renderUpdatedAt()} */}
      {/* <View /> */}
      <Divider />
    </View>
  );

  const renderNote = () => (
    <TextInput
      style={styles.noteInput}
      placeholder="Write your note here..."
      value={note}
      onChangeText={(text) => onChange({ title, note: text })}
      multiline
      textAlignVertical="top"
    />
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderNote()}
    </View>
  );
};

const makeStyles = (
  colors: typeof colorTokens,
  typography: typeof typographyTokens,
  spacing: typeof spacingTokens
) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.background[70],
      gap: spacing.sm,
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      flex: 1,
    },
    titleInput: {
      fontSize: typography.size["2xl"],
      fontWeight: "bold",
      color: colors.primary.heavy,
    },
    headerRowContainer: { flexDirection: "row" },
    headerRowLabel: { flex: 1 },
    headerRowContent: { flex: 2 },
    headerRowLabelFont: {
      fontSize: typography.size.md,
      color: colors.secondary.robust,
    },
    headerRowContentFont: {
      fontSize: typography.size.md,
      color: colors.primary.heavy,
    },
    noteInput: {
      fontSize: typography.size.md,
      color: colors.primary.heavy,
      textAlignVertical: "top",
    },
  });

export default NoteForm;
