import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = { email: "", password: "" };

export default function LoginScreen({ navigation }) {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 50 * 2
  );
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
    console.log(state);
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardShown(false);
  };
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 50 * 2;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={{ ...styles.image, width: Dimensions.get("window").width }}
          source={require("../../assets/images/bgrN.jpg")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isKeyboardShown ? 20 : 150,
                width: dimensions,
              }}
            >
              <View style={styles.header}>
                <Text style={styles.title}>Hi again,</Text>
                <Text style={styles.title}>Welcome back</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  textAlign={"center"}
                  secureTextEntry={true}
                  onFocus={() => setIsKeyboardShown(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                }}
                onPress={() => navigation.navigate("Registration")}
              >
                <Text style={{ color: "#fff" }}>
                  New to app?
                  <Text style={{ fontSize: 20, color: "#0000cd" }}>
                    To Registration
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {},
  header: {
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    fontSize: 40,
    color: "#fff",
    fontFamily: "Oswald-SemiBold",
  },
  inputTitle: {
    color: "#f0f8ff",
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Oswald-SemiBold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f8ff",
    height: 40,
    height: 40,
    fontWeight: "700",
    fontSize: 30,
    borderRadius: 6,
    color: "#f0f8ff",
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#4169e1",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "#4169e1" : "#f0f8ff",
    fontSize: 18,
    fontFamily: "Oswald-SemiBold",
  },
});
