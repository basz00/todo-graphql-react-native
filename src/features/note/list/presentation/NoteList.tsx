import { FlatList, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useGetNoteList } from "./hooks";
import NoteCard from "./ui/NoteCard";

const NoteList = () => {
  const { getNote, noteList } = useGetNoteList();

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
            onPress={() => console.log("Note pressed:", item.id)}
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
