import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  // const [mapInitialized, setMapInitialized] = useState(false);
  const { latitude, longitude } = route.params.location;
  console.log("route.params.location", route.params.location);
  // const onMapReady = async () => {
  //   if (mapInitialized) {
  //     return;
  //   }
  //   setMapInitialized(true);
  //   const initialRegion = {
  //     latitude: 50.005292,
  //     longitude: 36.331356,
  //     latitudeDelta: 0.001,
  //     longitudeDelta: 0.006,
  //   };
  //   return initialRegion;
  // };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        // onLayout={onMapReady}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="travel photo" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});

// export default MapScreen;
