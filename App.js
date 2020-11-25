import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreem from './screens/StartGameScreem';
import GameScreem from './screens/GameScreem';
import GameOverScreem from './screens/GameOverScreem';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

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
    content = <GameOverScreem roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHendler}/>
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {content}

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
});
