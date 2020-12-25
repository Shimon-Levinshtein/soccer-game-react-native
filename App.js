import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreem from './screens/StartGameScreem';
import GameScreem from './screens/GameScreem';
import GameOverScreem from './screens/GameOverScreem';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-Sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-Sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={err => console.log(arr)} />
  };

  const configureNewGameHendler = () => {
    setGuessRounds(0);
    setUserNumber(null)
  };

  const startGameHendler = selectedNumber => {
    setUserNumber(selectedNumber);
  };

  const GameOverHendler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreem onStartGame={startGameHendler} />

  if (userNumber && guessRounds <= 0) {
    content = <GameScreem userChoice={userNumber} onGameOver={GameOverHendler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreem roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHendler} />
  }

  return (
    <SafeAreaView style={styles.screen}>
        <Header title={"Guess a Number"} />
        {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
});
