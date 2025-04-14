import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackParams } from "@/app/navigation";
import { useDeleteNote, useUpdatenote } from "@/note/update/presentation/hooks";
import NoteForm from "@/features/note/common/ui/components/NoteForm";

const UpdateNote = () => {
  const { params } = useRoute<RouteProp<StackParams, "UpdateNote">>();
  const { goBack } = useNavigation();

  const { note } = params;

  const [form, setForm] = useState({
    title: note.title,
    note: note.note,
  });

  const { execute: executeUpdate, state: stateUpdate } = useUpdatenote();
  const { execute: executeDelete, state: stateDelete } = useDeleteNote();

  useEffect(() => {
    if (stateUpdate.success) {
      goBack();
    }
  }, [stateUpdate.success]);

  useEffect(() => {
    if (stateDelete.success) {
      goBack();
    }
  }, [stateDelete.success]);

  const handleUpdate = () => {
    executeUpdate({ ...note, ...form });
  };

  const handleDelete = () => {
    executeDelete(note.id);
  };

  return (
    <View style={{ padding: 16 }}>
      <NoteForm
        title={form.title}
        note={form.note}
        onChange={({ title, note }) => setForm({ title, note })}
      />

      <Pressable
        onPress={handleUpdate}
        style={{
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
      </Pressable>

      <Pressable
        onPress={handleDelete}
        style={{
          backgroundColor: "#FF3B30",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Delete</Text>
      </Pressable>
    </View>
  );
};

export default UpdateNote;
