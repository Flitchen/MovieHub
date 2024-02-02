import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import tw from "twrnc";

export default function CustomDrawerComponent(props) {
  return (
    <View style={tw`flex-1 bg-black`}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}
