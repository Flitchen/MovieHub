import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import PersonScreen from "./screens/PersonScreen";
import SearchScreen from "./screens/SearchScreen";
import SeeAllScreen from "./screens/SeeAllScreen";
import { styles } from "./themes/styles";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavouriteCasts from "./screens/FavouriteCasts";
import FavouriteMovies from "./screens/FavouriteMovies";
import {
  HomeIcon,
  UserIcon,
  VideoCameraIcon,
} from "react-native-heroicons/outline";
import customDrawerComponent from "./components/customDrawerComponent";
import { Provider } from "react-redux";
import store from "./store";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavs = () => {
  return (
    <Stack.Navigator
      // initialRouteName={"HomeScreen"}
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        contentStyle: {
          backgroundColor: `${styles.background}`,
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MovieScreen" component={MovieScreen} />
      <Stack.Screen name="PersonScreen" component={PersonScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="SeeAllScreen" component={SeeAllScreen} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerBackVisible: false,
            headerShown: false,
            drawerLabelStyle: {
              marginLeft: -20,
            },
            drawerActiveBackgroundColor: styles.primary,
            drawerActiveTintColor: "white",
            drawerInactiveTintColor: "gray",
          }}
          drawerContent={customDrawerComponent}
        >
          <Drawer.Screen
            name="Home"
            component={StackNavs}
            options={{
              drawerIcon: ({ color, size }) => (
                <HomeIcon size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="FavouriteMovies"
            component={FavouriteMovies}
            options={{
              drawerLabel: "Favourite Movies",
              title: "Favourite Movies",
              drawerIcon: ({ color, size }) => (
                <VideoCameraIcon size={size} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="FavouriteCasts"
            component={FavouriteCasts}
            options={{
              drawerLabel: "Favourite Casts",
              title: "Favourite Casts",
              drawerIcon: ({ color, size }) => (
                <UserIcon size={size} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
