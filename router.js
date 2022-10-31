import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RegistrationScreen from "./expo/screens/authScreens/RegistrationScreen";
import LoginScreen from "./expo/screens/authScreens/LoginScreen";
import CreateScreen from "./expo/screens/mainScreens/CreateScreen";
import PostsScreen from "./expo/screens/mainScreens/PostsSceen";
import ProfileScreen from "./expo/screens/mainScreens/ProfileScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Registration" component={RegistrationScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Posts" componenet={PostsScreen} />
      <MainTab.Screen name="Create" componenet={CreateScreen} />
      <MainTab.Screen name="Profile" componenet={ProfileScreen} />
    </MainTab.Navigator>
  );
};
