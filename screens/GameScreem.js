import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import NumberContaner from '../components/NumberContaner';

const genereteRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return genereteRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const StartScreem = props => {

    const [currentGuess, setCurrentGuess] = useState(genereteRandomBetween(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);

    const cuttentLow = useRef(1);
    const cuttentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        console.log('useEffect');
        console.log(currentGuess === userChoice);
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        };
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) ||
         (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
            return;
        };
        if (direction === 'lower') {
            cuttentHigh.current = currentGuess;
        } else {
            cuttentLow.current = currentGuess;
        }
        const nextNumber = genereteRandomBetween(cuttentLow.current, cuttentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContaner>{currentGuess}</NumberContaner>
            <Card style={styles.buttonContiner}>
                <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%',
    },
});

export default StartScreem;