import React, { useState } from "react";
import { 
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  StyleSheet 
} from "react-native";
import { useTheme } from "@/core/ui/theme/ThemeContext";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background.default,
    },
    card: {
      backgroundColor: colors.background.paper,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.neutral.black,
    },
    input: {
      fontSize: 16,
      color: colors.text.primary,
      marginBottom: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.neutral.black,
    },
    noteInput: {
      fontSize: 14,
      color: colors.text.primary,
      minHeight: 100,
      textAlignVertical: 'top',
    },
    saveButton: {
      position: 'absolute',
      bottom: 16,
      right: 16,
      left: 16,
      backgroundColor: colors.primary.main,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    saveButtonText: {
      color: colors.text.inverse,
      fontWeight: 'bold',
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }} // Menyediakan ruang untuk tombol
      >
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={colors.text.disabled}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.noteInput]}
            placeholder="Note..."
            placeholderTextColor={colors.text.disabled}
            value={note}
            onChangeText={setNote}
            multiline
            textAlignVertical="top"
            numberOfLines={4}
          />
        </View>
      </ScrollView>

      {/* Floating Save Button */}
      <Pressable 
        style={styles.saveButton}
        onPress={() => console.log('Save button pressed')}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default CreateNote;
