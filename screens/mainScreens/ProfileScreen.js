import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => dispatch(authSignOutUser());

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={userPosts}
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
              <Text>{item.comment}</Text>
            </View>
          </View>
        )}
      />
      <Button title="SignOut" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: { marginTop: 30 },
});

export default ProfileScreen;
