import axios from "axios";
import { API_KEY, API_BASE_URL } from "@env";

// End Points
const trendingMoviesEndPoint = `${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
const upcomingMoviesEndPoint = `${API_BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMoviesEndPoint = `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}`;
const searchMoviesEndPoint = `${API_BASE_URL}/search/movie?api_key=${API_KEY}`;

//Dynamic endpoints
const movieDetailsEndPoint = (id) =>
  `${API_BASE_URL}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndPoint = (id) =>
  `${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndPoint = (id) =>
  `${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`;

const personDetailsEndPoint = (id) =>
  `${API_BASE_URL}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndPoint = (id) =>
  `${API_BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoint(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndPoint(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndPoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndPoint(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndPoint(id));
};
export const searchMovies = (params) => {
  return apiCall(searchMoviesEndPoint, params);
};
