import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../themes/styles";
import { fallbackMoviePoster, image185 } from "../api/moviedb";
var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  let movieName = "Ant-Man and the Wasp: Quantamania";
  return (
    <View style={tw`mb-8 space-y-4`}>
      <View style={tw`mx-4 mb-2 flex-row justify-between items-center`}>
        <Text style={tw`text-white text-xl`}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity
            onPress={() => navigation.navigate("SeeAllScreen", { title, data })}
          >
            <Text style={tw`text-[${styles.primary}] text-lg`}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                navigation.push("MovieScreen", item);
              }}
            >
              <View style={tw`gap-1 mr-4`}>
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  // source={require("../assets/images/moviePoster2.png")}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 24,
                  }}
                />
                <Text style={tw`text-neutral-300 ml-1`}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
