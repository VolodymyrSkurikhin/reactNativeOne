// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
// import { View, StyleSheet } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";

import { useRoute } from "./router";
import { store } from "./redux/store";
import db from "./firebase/config";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import RegistrationScreen from "./.expo/screens/authScreens/RegistrationScreen";
// import LoginScreen from "./.expo/screens/authScreens/LoginScreen";
// import CreateScreen from "./.expo/screens/mainScreens/CreateScreen";
// import PostsScreen from "./.expo/screens/mainScreens/PostsSceen";
// import ProfileScreen from "./.expo/screens/mainScreens/ProfileScreen";

// const loadApplication = async () => {
//   await Font.loadAsync({
//     "Oswald-SemiBold": require("./assets/fonts/Oswald-SemiBold.ttf"),
//   });
// };

// const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

// const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator screenOptions={{ headerShown: false }}>
//         <AuthStack.Screen name="Registration" component={RegistrationScreen} />
//         <AuthStack.Screen name="Login" component={LoginScreen} />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     <MainTab.Navigator>
//       <MainTab.Screen name="Posts" componenet={PostsScreen} />
//       <MainTab.Screen name="Create" componenet={CreateScreen} />
//       <MainTab.Screen name="Profile" componenet={ProfileScreen} />
//     </MainTab.Navigator>
//   );
// };

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(null);

  db.auth().onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(user);

  // const loadApplication = async () => {
  //   await Font.loadAsync({
  //     "Oswald-SemiBold": require("./assets/fonts/Oswald-SemiBold.ttf"),
  //   });
  //   setAppIsReady(true);
  // };
  // loadApplication();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "Oswald-SemiBold": require("./assets/fonts/Oswald-SemiBold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView}>
        {routing}
      </NavigationContainer>
    </Provider>
  );
}

// export default { App };
