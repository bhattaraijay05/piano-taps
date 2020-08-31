import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Button,
  SafeAreaView,
} from "react-native";
import { Audio } from "expo-av";
const windowWidth = Dimensions.get("window").width;
/*
        Things  TODO
        SET Opacity of touchable opacity to 0
*/
const Home = () => {
  const [score, setScore] = useState(0);
  const [tileColor, setTileColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [disableTouchableOpacity, setdisableTouchableOpacity] = useState(false);
  const [enableScrollView, setEnableScrollView] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [playAudio, setPlayAudio] = useState(true);

  const scored = () => {
    setScore(score + 1);
    setPlayAudio(true);
  };

  const playingMusic = () => {
    setScore(score + 1);
    // setPlayAudio(false);
    playMusic();
  };

  const gameOver = () => {
    setTileColor("transparent");
    setBackgroundColor("red");
    setdisableTouchableOpacity(true);
    setEnableScrollView(false);
    setOpacity(0);
    // stopMusic();
  };

  const restartGame = () => {
    setScore(0);
    setTileColor("black");
    setBackgroundColor("transparent");
    setdisableTouchableOpacity(false);
    setEnableScrollView(true);
    setOpacity(1);
  };

  async function playMusic() {
    try {
      await Audio.Sound.createAsync(require("../../assets/music/music.mp3"), {
        shouldPlay: true,
        isLooping: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //   useEffect(async () => {
  //     const playAudio = await Audio.Sound.createAsync(
  //       require("../../assets/music/music.mp3"),
  //       {
  //         shouldPlay: true,
  //         isLooping: true,
  //       }
  //     );
  //   }, [playAudio]);

  //   async function playMusic() {
  //     try {

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async function stopMusic() {
  //     try {
  //       await Audio.Sound.createAsync(stopAsync());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  useEffect(() => {
    setTimeout(() => {
      scrollView.scrollToEnd({ animated: true });
    }, 5000);
  }, []);

  return (
    <SafeAreaView>
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: `${backgroundColor}` },
        ]}
      >
        <Text style={[styles.score, { opacity: opacity }]}>{score}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEnabled={enableScrollView}
          ref={(ref) => {
            scrollView = ref;
          }}
          scrollEventThrottle={16}
          onScrollToTop
        >
          <View style={{ flexDirection: "column-reverse" }}>
            <View style={styles.container}>
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity
                onPress={playingMusic}
                disabled={disableTouchableOpacity}
                style={[styles.tiles, { backgroundColor: `${tileColor}` }]}
              />
            </View>
            <View style={styles.container}>
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity
                disabled={disableTouchableOpacity}
                onPress={scored}
                style={[styles.tiles, { backgroundColor: `${tileColor}` }]}
              />
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
            </View>
            <View style={styles.container}>
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />

              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity
                disabled={disableTouchableOpacity}
                onPress={scored}
                style={[styles.tiles, { backgroundColor: `${tileColor}` }]}
              />
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={scored}
                disabled={disableTouchableOpacity}
                style={[styles.tiles, { backgroundColor: `${tileColor}` }]}
              />
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />

              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
              <TouchableOpacity onPress={gameOver} style={styles.tiles} />
            </View>
          </View>
        </ScrollView>

        {tileColor === "transparent" && (
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 50 }}>Game Over </Text>
            <Text style={{ fontSize: 30 }}>Score: {score}</Text>
            <TouchableOpacity style={{ marginTop: 70 }} onPress={restartGame}>
              <Text style={{ fontSize: 70 }}>Play Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  mainContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    position: "absolute",
    fontSize: 60,
    top: 30,
    fontWeight: "bold",
  },
  tiles: {
    width: windowWidth / 4,
    height: 250,
    borderWidth: 0.2,
    position: "relative",
  },
});

export default Home;
