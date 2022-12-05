import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import db from "../../firebase/config";

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { nickName } = useSelector((state) => state.auth);
  useEffect(() => {
    getAllComments();
  }, []);

  const { postId } = route.params;
  const createComment = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, nickName });
    setComment("");
  };
  const getAllComments = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.input,
                marginHorizontal: 10,
                marginBottom: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text>{item.nickName}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={setComment}></TextInput>
        </View>
        <TouchableOpacity onPress={createComment} style={styles.sendBtn}>
          <Text style={styles.sendLabel}>ADD COMMENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#20b2aa",
    fontSize: 20,
  },
  inputContainer: { marginHorizontal: 10 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#fff",
    borderBottomColor: `#8a2be2`,
    shadowColor: "#008b8b",
    elevation: 2,
  },
});

// export default CommentsScreen;
