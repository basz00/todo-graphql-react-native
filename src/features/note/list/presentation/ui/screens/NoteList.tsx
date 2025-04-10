import { FlatList, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useGetNoteList } from "@/features/note/list/presentation/hooks";
import NoteCard from "@/features/note/list/presentation/ui/components/NoteCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "@/app/navigation";

const NoteList = () => {
  const { getNote, noteList } = useGetNoteList();
  const { navigate } = useNavigation<NativeStackNavigationProp<StackParams>>();

  useEffect(() => {
    getNote();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={noteList}
        keyExtractor={(item) => "" + item.id}
        renderItem={({ item }) => (
          <NoteCard
            title={item.title}
            note={item.note}
            createdAt={"" + item.createdAt}
            onPress={() => {
              navigate("CreateNote");
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default NoteList;
