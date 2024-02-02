import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { styles } from "../themes/styles";
var { width, height } = Dimensions.get("window");
export default function Loading() {
  return (
    <View
      style={StyleSheet.compose(
        { width, height },
        tw`absolute flex-row justify-center items-center`
      )}
    >
      <Progress.CircleSnail thickness={12} size={160} color={styles.primary} />
    </View>
  );
}
