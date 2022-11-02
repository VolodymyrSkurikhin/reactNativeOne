import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import RegistrationScreen from "./screens/authScreens/RegistrationScreen";
import LoginScreen from "./screens/authScreens/LoginScreen";
import CreateScreen from "./screens/mainScreens/CreateScreen.js";
import PostsScreen from "./screens/mainScreens/PostsScreen.js";
import ProfileScreen from "./screens/mainScreens/ProfileScreen.js";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

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
    <MainTab.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="post" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons name="post-add" size={size} color={color} />
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="profile" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};
