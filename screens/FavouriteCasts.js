import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { styles } from "../themes/styles";
import {
  Bars3CenterLeftIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectCasts } from "../slices/favouriteCastSlice";
import { fallbackPersonImage, image185 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

export default function FavouriteCasts() {
  const navigation = useNavigation();
  const favouriteCasts = useSelector(selectCasts);
  // console.log("favouriteCasts: ", favouriteCasts);
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-800 py-4`}>
      <View style={tw`flex flex-row items-center my-3 px-3`}>
        <Bars3CenterLeftIcon
          size={30}
          strokeWidth={2}
          color="white"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Text style={tw`text-white text-2xl font-bold ml-20 `}>
          Favourite <Text style={tw`text-[${styles.primary}]`}>Casts</Text>
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row justify-between flex-wrap px-3`}>
          {favouriteCasts?.length > 0 ? (
            favouriteCasts?.map((cast, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("PersonScreen", cast)}
                >
                  <View style={tw`space-y-2 mb-4`}>
                    <Image
                      style={StyleSheet.compose(tw`rounded-3xl`, {
                        width: width * 0.44,
                        height: height * 0.3,
                      })}
                      source={{
                        uri:
                          image185(cast?.profile_path) || fallbackPersonImage,
                      }}
                    />
                    <Text style={tw`text-neutral-300 ml-1`}>
                      {cast?.name.length > 22
                        ? cast?.name.slice(0, 22)
                        : cast?.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          ) : (
            <View style={tw`text-center`}>
              <View style={tw`flex-row justify-center`}>
                <Image
                  source={require("../assets/images/movieTime.png")}
                  style={tw`h-96 w-96`}
                />
              </View>
              <Text
                style={tw`text-neutral-300 text-center text-xl text-semibold`}
              >
                No casts available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
