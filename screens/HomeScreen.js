import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { styles } from "../themes/styles";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";

// const ios = Platform.OS == "ios";
export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log("Trending movies: ", data);
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log("Upcoming movies: ", data);
    if (data && data.results) {
      setUpcoming(data.results);
    }
    setLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log("Top rated movies: ", data);
    if (data && data.results) {
      setTopRated(data.results);
    }
    setLoading(false);
  };
  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw` ios:-mb-2 android:mb-3`}>
        <StatusBar style="light" />
        <View style={tw`flex flex-row justify-between items-center mx-4`}>
          <Bars3CenterLeftIcon
            size={30}
            strokeWidth={2}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={tw`text-[${styles.primary}]`}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies */}
          {trending.length > 0 && <TrendingMovies data={trending} />}
          {/* Upcoming movies */}
          <MovieList title="Upcoming" data={upcoming} />
          {/* Rated movies */}
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
}
