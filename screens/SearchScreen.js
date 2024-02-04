import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { debounce } from "lodash";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";

var { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let movieName = "Ant-Man and the Wasp: Quantamania";
  const handleSearch = (value) => {
    // console.log("value: ", value);
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        // console.log("The movies: ", data);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  return (
    <SafeAreaView style={tw`bg-neutral-800 flex-1`}>
      <View
        style={tw`mx-4 mt-2 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full`}
      >
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          style={tw` pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
          style={tw`rounded-full p-2 m-1 bg-neutral-500`}
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* Results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={tw`space-y-3`}
        >
          <Text style={tw`text-white font-semibold ml-1 mb-2`}>
            Results ({results.length})
          </Text>
          <View style={tw`flex-row justify-between flex-wrap`}>
            {results.map((item, index) => {
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
      ) : (
        <View style={tw`flex-row justify-center`}>
          <Image
            source={require("../assets/images/movieTime.png")}
            style={tw`h-96 w-96`}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
