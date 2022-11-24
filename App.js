// import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";

// import { useRoute } from "./router";
import { store } from "./redux/store";
// import db from "./firebase/config";
import { Main } from "./components/Main";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  // const [user, setUser] = useState(null);

  // db.auth().onAuthStateChanged((user) => setUser(user));
  // const routing = useRoute(user);

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
    <Provider onLayout={onLayoutRootView} store={store}>
      {/* <NavigationContainer>{routing}</NavigationContainer> */}
      <Main />
    </Provider>
  );
}

// export default { App };
