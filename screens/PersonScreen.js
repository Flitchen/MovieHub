import {
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../themes/styles";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";
import { useDispatch, useSelector } from "react-redux";
import { addCast, removeCast, selectCasts } from "../slices/favouriteCastSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
var { width, height } = Dimensions.get("window");
export default function PersonScreen() {
  const { params: item } = useRoute();
  const dispatch = useDispatch();
  // const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(true);
  const favouriteCasts = useSelector(selectCasts);
  // console.log("favouriteCasts: ", favouriteCasts);
  const handleFavourite = async (person) => {
    const castDetails = {
      id: person.id,
      name: person.name,
      profile_path: person.profile_path,
    };
    try {
      if (favouriteCasts?.some((cast) => cast.id === person.id)) {
        const filteredCasts = favouriteCasts.filter(
          (cast) => cast.id !== person.id
        );

        await AsyncStorage.setItem(
          "Favourite-casts",
          JSON.stringify([...filteredCasts])
        );
        dispatch(removeCast(castDetails));
      } else {
        await AsyncStorage.setItem(
          "Favourite-casts",
          JSON.stringify([...favouriteCasts, castDetails])
        );
        dispatch(addCast(castDetails));
      }
    } catch (error) {
      // console.log(error)
    }

    // favouriteCasts?.some((cast) => cast.id === person.id)
    //   ? dispatch(removeCast(castDetails))
    //   : dispatch(addCast(castDetails));
  };

  const navigation = useNavigation();
  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    // console.log("details: ", data);
    if (data) setPerson(data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    // console.log("movies: ", data);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    // console.log("Person: ", item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  return (
    <ScrollView
      style={tw`flex-1 bg-neutral-900`}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView
        style={tw` z-20 w-full flex-row justify-between items-center px-4 android:mt-8`}
      >
        <TouchableOpacity
          style={tw`flex rounded-xl bg-[${styles.primary}] p-1 text-[${styles.primary}] justify-center items-center`}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <ChevronLeftIcon size={28} strokeWidth={2} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`rounded-xl p-1 text-[${styles.primary}] `}
          onPress={() => {
            // setIsFavourite(!isFavourite);
            handleFavourite(person);
          }}
        >
          <HeartIcon
            size={35}
            strokeWidth={2}
            color={
              favouriteCasts?.some((cast) => cast.id === person.id)
                ? "red"
                : "white"
            }
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={tw`flex-row justify-center `}>
            <View
              style={tw`items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500`}
            >
              <Image
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                // source={require("../assets/images/castImage2.png")}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View style={tw`mt-6`}>
            <Text style={tw`text-white text-3xl text-center font-bold`}>
              {person?.name}{" "}
            </Text>
            <Text style={tw`text-neutral-500 text-base text-center `}>
              {person?.place_of_birth}
            </Text>
          </View>
          <View
            style={tw`mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full`}
          >
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Gender</Text>
              <Text Malestyle={tw`text-neutral-300 text-sm`}>
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Birthday</Text>
              <Text Malestyle={tw`text-neutral-300 text-sm`}>
                {person?.birthday}{" "}
              </Text>
            </View>
            <View style={tw`border-r-2 border-r-neutral-400 px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Known for</Text>
              <Text Malestyle={tw`text-neutral-300 text-sm`}>
                {person?.known_for_department}
              </Text>
            </View>
            <View style={tw`px-2 items-center`}>
              <Text style={tw`text-white font-semibold`}>Popularity</Text>
              <Text Malestyle={tw`text-neutral-300 text-sm`}>
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View style={tw`my-5 mx-4 space-y-2`}>
            <Text style={tw`text-white text-lg`}>Biography</Text>
            <Text style={tw`text-neutral-400 tracking-wider`}>
              {person?.biography || "N/A"}
            </Text>
          </View>
          {/* Movie list of the cast */}
          <MovieList data={personMovies} title="Movies" hideSeeAll={true} />
        </View>
      )}
    </ScrollView>
  );
}
