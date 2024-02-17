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
import { Bars3CenterLeftIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { fallbackMoviePoster, image185 } from "../api/moviedb";
import { selectMovies } from "../slices/favouriteMovieSlice";

var { width, height } = Dimensions.get("window");

export default function FavouriteCasts() {
  const navigation = useNavigation();
  const favouriteMovies = useSelector(selectMovies);
  // console.log("favouriteMovies: ", favouriteMovies);
  return (
    <SafeAreaView style={tw`flex-1 bg-neutral-800 py-4`}>
      <View style={tw`flex flex-row items-center my-6 px-3`}>
        <Bars3CenterLeftIcon
          size={30}
          strokeWidth={2}
          color="white"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Text style={tw`text-white text-2xl font-bold ml-20 `}>
          Favourite <Text style={tw`text-[${styles.primary}]`}>Movies</Text>
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row justify-between flex-wrap px-3`}>
          {favouriteMovies?.length > 0 ? (
            favouriteMovies?.map((movie, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.navigate("MovieScreen", movie)}
                >
                  <View style={tw`space-y-2 mb-4`}>
                    <Image
                      style={StyleSheet.compose(tw`rounded-3xl`, {
                        width: width * 0.44,
                        height: height * 0.3,
                      })}
                      source={{
                        uri:
                          image185(movie?.poster_path) || fallbackMoviePoster,
                      }}
                    />
                    <Text style={tw`text-neutral-300 ml-1`}>
                      {movie?.title.length > 22
                        ? movie?.title.slice(0, 22)
                        : movie?.title}
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
                No movies available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
