import { StackParams } from "@/app/navigation";
import { useToast } from "@/core/toast/ToastContext";
import { Button } from "@/core/ui/components";
import {
  colors as colorTokens,
  spacing as spacingTokens,
  useTheme,
} from "@/core/ui/theme";
import NoteForm from "@/features/note/common/ui/components/NoteForm";
import { useDeleteNote, useUpdatenote } from "@/note/update/presentation/hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const UpdateNote = () => {
  const { params } = useRoute<RouteProp<StackParams, "UpdateNote">>();
  const { goBack } = useNavigation();
  const { note } = params;

  const { colors, spacing } = useTheme();
  const styles = makeStyles(colors, spacing);

  const [form, setForm] = useState({
    title: note.title,
    note: note.note,
  });

  const { execute: executeUpdate, state: stateUpdate } = useUpdatenote();
  const { execute: executeDelete, state: stateDelete } = useDeleteNote();

  const { show } = useToast();

  useEffect(() => {
    if (stateUpdate.success) {
      show("Note updated!");
      goBack();
    }
  }, [stateUpdate.success]);

  useEffect(() => {
    if (stateDelete.success) {
      show("Note deleted!");
      goBack();
    }
  }, [stateDelete.success]);

  const handleUpdate = () => {
    if (!form.title && !form.note) {
      show("Please enter title and/or note");
      return;
    }
    executeUpdate({ ...note, ...form });
  };

  const handleDelete = () => {
    executeDelete(note.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.noteContainer}>
        <NoteForm
          title={form.title}
          note={form.note}
          onChange={({ title, note }) => setForm({ title, note })}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={handleUpdate}
          disabled={stateUpdate.loading || stateDelete.loading}
        >
          <Text style={styles.buttonFont}>Update</Text>
        </Button>

        <Button
          onPress={handleDelete}
          style={styles.buttonDelete}
          disabled={stateUpdate.loading || stateDelete.loading}
        >
          <Text style={styles.buttonFont}>Delete</Text>
        </Button>
      </View>
    </View>
  );
};

const makeStyles = (
  colors: typeof colorTokens,
  spacing: typeof spacingTokens
) =>
  StyleSheet.create({
    container: { flex: 1, padding: spacing.md, gap: spacing.md },
    noteContainer: { flex: 1 },
    buttonsContainer: { gap: spacing.md },
    buttonFont: {
      color: colors.secondary.base,
    },
    buttonDelete: {
      backgroundColor: colors.error.main,
    },
  });

export default UpdateNote;
