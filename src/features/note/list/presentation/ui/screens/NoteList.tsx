import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { useGetNoteList } from "@/features/note/list/presentation/hooks";
import NoteCard from "@/features/note/list/presentation/ui/components/NoteCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParams } from "@/app/navigation";
import { useTheme } from "@/core/ui/theme/ThemeContext";
import { colors as colorTokens } from "@/core/ui/theme/colors";
import { spacing as spacingTokens } from "@/core/ui/theme/spacing";
import { Button } from "@/core/ui/components";

const NoteList = () => {
  const { getNote, noteList } = useGetNoteList();
  const { navigate } = useNavigation<NativeStackNavigationProp<StackParams>>();

  const { colors, spacing } = useTheme();
  const styles = makeStyles(colors, spacing);

  const { width } = useWindowDimensions();
  const columnGap = spacing.md;
  const contentContainerPaddingStart = spacing.md;
  const contentContainerPaddingEnd = spacing.md;
  const itemWidth =
    (width -
      columnGap -
      contentContainerPaddingStart -
      contentContainerPaddingEnd) /
    2;

  useEffect(() => {
    getNote();
  }, []);

  const renderCreateButton = () => {
    return (
      <Button
        onPress={() => {
          navigate("CreateNote");
        }}
      >
        <Text style={{ color: colors.secondary.base }}>Create Note</Text>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={noteList}
        keyExtractor={(item) => "" + item.id}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        columnWrapperStyle={{
          gap: columnGap,
        }}
        contentContainerStyle={{
          ...styles.contentContainer,
          paddingLeft: contentContainerPaddingStart,
          paddingRight: contentContainerPaddingEnd,
        }}
        renderItem={({ item }) => (
          <View style={{ width: itemWidth }}>
            <NoteCard
              title={item.title}
              note={item.note}
              createdAt={"" + item.createdAt}
              onPress={() => {
                navigate("UpdateNote", { note: item });
              }}
            />
          </View>
        )}
      />
      <View
        style={{
          height: 100,
          width: width,
          position: "absolute",
          bottom: 0,
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.background[70],
            opacity: 0.7,
            flex: 1,
          }}
        />
        {renderCreateButton()}
      </View>
    </View>
  );
};

const makeStyles = (
  colors: typeof colorTokens,
  spacing: typeof spacingTokens
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background[70],
    },
    contentContainer: {
      paddingVertical: spacing.md,
    },
  });

export default NoteList;
