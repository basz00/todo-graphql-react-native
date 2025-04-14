import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/core/ui/theme";

const Divider = ({ height = 1 }: { height?: number }) => {
  const { colors } = useTheme();

  return <View style={{ height, backgroundColor: colors.item[40] }} />;
};

export default Divider;
