import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  DefaultScreenPosts,
  CommentsScreen,
  MapScreen,
} from "../nestedScreens";

const NestedScreen = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreenPosts"
        component={DefaultScreenPosts}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
