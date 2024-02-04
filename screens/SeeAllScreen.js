import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../themes/styles";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
export default function SeeAllScreen() {
  const { params } = useRoute();
  const navigation = useNavigation();
  // console.log(params);
  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View style={tw`flex flex-row items-center my-3 px-3`}>
        <TouchableOpacity
          style={tw`flex rounded-xl bg-[${styles.primary}] p-1 text-[${styles.primary}] justify-center items-center`}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ChevronLeftIcon size={28} strokeWidth={2} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-semibold ml-20 `}>
          {params?.title} Movies
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={tw`space-y-3`}
      >
        <View style={tw`flex-row justify-between flex-wrap px-3`}>
          {params?.data?.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("MovieScreen", item)}
              >
                <View style={tw`space-y-2 mb-4`}>
                  <Image
                    style={StyleSheet.compose(tw`rounded-3xl`, {
                      width: width * 0.44,
                      height: height * 0.3,
                    })}
                    source={{
                      uri: image185(item?.poster_path) || fallbackMoviePoster,
                    }}
                    // source={require("../assets/images/moviePoster2.png")}
                  />
                  <Text style={tw`text-neutral-300 ml-1`}>
                    {item?.title.length > 22
                      ? item?.title.slice(0, 22) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
