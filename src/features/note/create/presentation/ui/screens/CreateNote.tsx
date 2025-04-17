import { useToast } from "@/core/toast/ToastContext";
import { Button } from "@/core/ui/components";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as themeColors } from "@/core/ui/theme/colors";
import { NoteForm } from "@/features/note/common/ui";
import { useCreateNote } from "@/note/create/presentation/hooks";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CreateNote = () => {
  const { goBack } = useNavigation();

  const { execute, state } = useCreateNote();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const { show } = useToast();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (state.success) {
      show("Note created!");
      goBack();
    }
  }, [state.success]);

  const executeCreateNote = () => {
    if (!title || !note) {
      show("Please enter title and/or note");
      return;
    }
    execute({ title, note });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.parentContainer}
    >
      <View style={styles.container}>
        <View style={styles.noteContainer}>
          <NoteForm
            title={title}
            note={note}
            onChange={({ title, note }) => {
              setTitle(title);
              setNote(note);
            }}
          />
        </View>

        <View>
          <Button
            onPress={() => {
              executeCreateNote();
            }}
            disabled={state.loading}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const makeStyles = (colors: typeof themeColors) =>
  StyleSheet.create({
    parentContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      gap: 16,
      padding: 16,
      backgroundColor: colors.background[70],
    },
    noteContainer: {
      flex: 0.9,
      maxHeight: "90%",
      overflow: "hidden",
    },
    saveButton: {
      backgroundColor: colors.primary.heavy,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    saveButtonText: {
      color: colors.primary.base,
      fontWeight: "bold",
    },
  });

export default CreateNote;
