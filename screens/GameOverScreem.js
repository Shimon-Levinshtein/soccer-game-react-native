import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import NumberContaner from '../components/NumberContaner';


const GameOverScreem = props => {

    return (
        <View style={styles.screen}>
            <Text>The Game is over!</Text>
            <Text>Number of rounds {props.roundsNumber}</Text>
            <Text>Number was {props.userNumber}</Text>
            <Button title='NEW GAME' onPress={props.onRestart}/>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default GameOverScreem;