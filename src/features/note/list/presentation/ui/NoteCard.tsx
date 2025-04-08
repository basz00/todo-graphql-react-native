import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  note: string;
  createdAt: string;
  onPress: () => void;
}

const NoteCard = ({ title, note, createdAt, onPress }: Props) => {
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  note: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});

export default NoteCard;
