import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as themeColors } from "@/core/ui/theme/colors";
import { useCreateNote } from "@/note/create/presentation/hooks";
import { NoteInputCard } from "@/features/note/common/ui";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const { execute, state } = useCreateNote();

  const { colors } = useTheme();

  const styles = makeStyles(colors);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }} // Menyediakan ruang untuk tombol
      >
        <NoteInputCard
          title={title}
          note={note}
          onChange={({ title, note }) => {
            setTitle(title);
            setNote(note);
          }}
        />
      </ScrollView>

      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          pressed && { opacity: 0.7, transform: [{ scale: 0.98 }] },
        ]}
        onPress={() => {
          execute({ title, note });
        }}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      // backgroundColor: colors.background.default,
    },
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
    saveButton: {
      position: "absolute",
      bottom: 16,
      right: 16,
      left: 16,
      // backgroundColor: colors.primary.main,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    saveButtonText: {
      // color: colors.text.inverse,
      fontWeight: "bold",
    },
  });

export default CreateNote;
