import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
// import { TouchableOpacity } from "react-native-web";

const CreateScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [ready, setReady] = useState(false);
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    requestPermission();
  }, []);
  // const checkCameraReady=()=>{}
  const takePhoto = async () => {
    if (ready) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      console.log("photo", photo);
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
  if (!permission) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  camera: {
    flex: 1,
    // height: 300,
    // paddingTop: 200,
    // top: 20,
    // alignItems: "center",
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
});

export default CreateScreen;
