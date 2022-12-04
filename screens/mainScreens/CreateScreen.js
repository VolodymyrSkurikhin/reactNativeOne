import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

import db from "../../firebase/config";
// import { TouchableOpacity } from "react-native-web";

const CreateScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [ready, setReady] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const { userId, nickName } = useSelector((state) => state.auth);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();
  useEffect(() => {
    requestCameraPermission();
    requestLocationPermission();
  }, []);
  // const checkCameraReady=()=>{}
  const takePhoto = async () => {
    if (ready) {
      const photo = await camera.takePictureAsync();
      const location = await Location.getCurrentPositionAsync();
      setPhoto(photo.uri);
      setLocation(location);
      console.log("photo", photo);
      console.log("latitude", location.coords.latitude);
      console.log("longitude", location.coords.longitude);
      return;
    }
    console.log("camera is not ready");
    return;
  };
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const data = await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    console.log("data", data);
    const processedPhoto = await db
      .storage()
      .ref(`postImage`)
      .child(uniquePostId)
      .getDownloadURL();
    console.log("processedPhoto", processedPhoto);
    return processedPhoto;
  };
  const uploadPostToServer = async () => {
    const photoFromFireSt = await uploadPhotoToServer();
    await db.firestore().collection("posts").add({
      photoFromFireSt,
      comment,
      location: location.coords,
      userId,
      nickName,
    });
  };
  const sendPhoto = async () => {
    // uploadPhotoToServer();
    await uploadPostToServer();
    navigation.navigate("DefaultScreenPosts");
    setPhoto(null);
  };
  if (!cameraPermission) {
    return <Text>No access to camera</Text>;
  }
  if (!locationPermission) {
    return <Text>No access to location</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={{ ...styles.camera, height: photo ? "75%" : "90%" }}
        onCameraReady={() => setReady(true)}
        ref={setCamera}
        type={type}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </View>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
          <Text style={styles.snap}>SNAP</Text>
        </TouchableOpacity>
      </Camera>
      {photo && (
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
            ></TextInput>
          </View>
          <TouchableOpacity onPress={sendPhoto} style={styles.sendBtn}>
            <Text style={styles.sendLabel}>SEND</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    // flex: 1,
    // height: 300,
    // paddingTop: 200,
    // top: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  buttonContainer: {
    alignSelf: "center",
    position: "absolute",
    top: 30,
  },
  button: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#0000ff",
    justifyContent: "center",
    alignItems: "center",
  },
  snapContainer: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#ffa500",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // top: 200,
    // paddingTop: 200,
    // marginTop: 200,
  },
  snap: { color: "#fff" },
  sendBtn: {
    marginHorizontal: 30,
    height: 40,
    borderWidth: 2,
    borderColor: "#20b2aa",
    borderRadius: 10,
    marginTop: 20,
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

export default CreateScreen;
