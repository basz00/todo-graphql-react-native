import { View, Text, Pressable } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { StackParams } from "@/app/navigation";
import { useDeleteNote, useUpdatenote } from "@/note/update/presentation/hooks";

const UpdateNote = () => {
  const { params } = useRoute<RouteProp<StackParams, "UpdateNote">>();
  const { note } = params;

  const { execute: executeUpdate, state: stateUpdate } = useUpdatenote();
  const { execute: executeDelete, state: stateDelete } = useDeleteNote();

  console.log("stateUpdate", stateUpdate);
  console.log("stateDelete", stateDelete);

  return (
    <View>
      <Pressable
        onPress={() => {
          executeUpdate({ ...note, ...{ note: "hello,updated from the app" } });
        }}
      >
        <Text>Update</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          executeDelete(note.id);
        }}
      >
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
};

export default UpdateNote;
