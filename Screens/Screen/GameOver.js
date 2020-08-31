import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GameOver = () => {
  return (
    <View style={styles.container}>
      <Text>Game Over</Text>
    </View>
  );
};

export default GameOver;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
