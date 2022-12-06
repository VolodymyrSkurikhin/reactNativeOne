import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { authSignOutUser } from "../../redux/auth/authOperations";
import db from "../../firebase/config";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {}, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        console.log(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => dispatch(authSignOutUser());

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
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
});

export default ProfileScreen;
