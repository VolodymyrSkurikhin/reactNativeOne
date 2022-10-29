import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RegistrationScreen from "./.expo/screens/RegistrationScreen";

const loadApplication = async () => {
  await Font.loadAsync({
    "Oswald-SemiBold": require("./assets/fonts/Oswald-SemiBold.ttf"),
  });
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const loadApplication = async () => {
    await Font.loadAsync({
      "Oswald-SemiBold": require("./assets/fonts/Oswald-SemiBold.ttf"),
    });
    setAppIsReady(true);
  };
  loadApplication();

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onLayout={onLayoutRootView}
    >
      <RegistrationScreen />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// export default { App };
