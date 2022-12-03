import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image, Button } from "react-native";

import db from "../../firebase/config";

export const DefaultScreenPosts = ({ route, navigation }) => {
  console.log("route.params", route.params);
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    console.log("posts", posts);
  };
  useEffect(() => {
    // if (route.params) {
    //   setPosts((prevState) => [...prevState, route.params]);
    // }
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item.photoFromFireSt }}
              style={{ width: 350, height: 200 }}
            />
            <View>
              <Button
                title="go to map"
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              />
              <Button
                title="go to Comments"
                onPress={() => navigation.navigate("Comments")}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

// export default PostsScreen;
