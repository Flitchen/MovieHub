import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { fallbackMoviePoster, image500 } from "../api/moviedb";
var { width, height } = Dimensions.get("window");
export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("MovieScreen", item);
  };
  return (
    <View style={tw`mb-8`}>
      <Text style={tw`text-white text-xl mx-4 mb-5`}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
        // source={require("../assets/images/moviePoster1.png")}
        style={StyleSheet.compose(
          { width: width * 0.6, height: height * 0.4, borderRadius: 24 },
          tw`rounded-3xl`
        )}
      />
    </TouchableWithoutFeedback>
  );
};
