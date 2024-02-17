import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../themes/styles";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";
import { useDispatch, useSelector } from "react-redux";
import {
  addMovie,
  removeMovie,
  selectMovies,
} from "../slices/favouriteMovieSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favouriteMovies = useSelector(selectMovies);
  // console.log("favouriteMovies: ", favouriteMovies);
  // let movieName = "Ant-Man and the Wasp: Quantamania";
  // const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const handleFavourite = async (film) => {
    const movieDetails = {
      id: film.id,
      title: film.title,
      poster_path: film.poster_path,
    };
    try {
      if (favouriteMovies?.some((movie) => movie.id === film.id)) {
        const filteredMovies = favouriteMovies.filter(
          (movie) => movie.id !== film.id
        );
        dispatch(removeMovie(movieDetails));
        await AsyncStorage.setItem(
          "Favourite-movies",
          JSON.stringify([...filteredMovies])
        );
      } else {
        dispatch(addMovie(movieDetails));
        await AsyncStorage.setItem(
          "Favourite-movies",
          JSON.stringify([...favouriteMovies, movieDetails])
        );
        const response = await AsyncStorage.getItem("Favourite-movies");
        // console.log("response: ", response);
      }
    } catch (error) {}

    // favouriteMovies?.some((movie) => movie.id === film.id)
    //   ? dispatch(removeMovie(movieDetails))
    //   : dispatch(addMovie(movieDetails));
  };
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("movie details: ", data);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log("movie credits: ", data);
    if (data && data.cast) {
      setCast(data.cast);
    }
    setLoading(false);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log("similar movies: ", data);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
    setLoading(false);
  };
  useEffect(() => {
    //Call the movie details API
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      style={tw`flex-1 bg-neutral-900`}
    >
      <View style={tw`w-full`}>
        <SafeAreaView
          style={tw` z-20 w-full flex-row justify-between items-center px-4 android:mt-3`}
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
              handleFavourite(movie);
            }}
          >
            <HeartIcon
              size={35}
              strokeWidth={2}
              color={
                favouriteMovies?.some((film) => film.id === movie.id)
                  ? styles.primary
                  : "white"
              }
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Image
            source={{
              uri: image500(movie?.poster_path) || fallbackMoviePoster,
            }}
            // source={require("../assets/images/moviePoster2.png")}
            style={{ width, height: height * 0.8 }}
          />
          <View style={tw`absolute bottom-0`}>
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        </View>
      )}

      <View style={tw`mt-[-${height * 0.09}] space-y-3`}>
        <Text
          style={tw`text-white text-center text-3xl font-bold tracking-wider`}
        >
          {movie?.title}
        </Text>
        {/* Status,release, runtime */}
        {movie?.id ? (
          <Text
            style={tw`text-neutral-400 font-semibold text-base text-center`}
          >
            {movie?.status} | {movie?.release_date?.split("-")[0]} |{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* Genres */}
        <View style={tw`flex-row justify-center mx-4 space-x-2`}>
          {movie?.genres?.map((genre, index) => {
            let showSeparator = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                style={tw`text-neutral-400 font-semibold text-base text-center`}
              >
                {genre.name} {showSeparator ? "| " : null}
              </Text>
            );
          })}
        </View>
        {/* Description for the movie */}
        <Text style={tw`text-neutral-400 mx-4 tracking-wide`}>
          {movie?.overview}
        </Text>
      </View>
      {/* Casts */}
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}
      {/* Similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
