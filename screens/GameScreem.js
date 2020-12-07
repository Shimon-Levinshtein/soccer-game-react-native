import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import NumberContaner from '../components/NumberContaner';
import DefaultStyles from '../constants/defaultd-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';



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

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const StartScreem = props => {
    const initiallGuss = genereteRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initiallGuss);
    const [pastGuesses, setPastGuesses] = useState([initiallGuss]);

    const cuttentLow = useRef(1);
    const cuttentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContaner>{currentGuess}</NumberContaner>
            <Card style={styles.buttonContiner}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.list}>
            <ScrollView>
                {pastGuesses.map((guess, index) => renderListItem(guess, index + 1))}
            </ScrollView>
            </View>
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
        width: 400,
        maxWidth: '90%',
    },
    list: {
        width: '80%'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default StartScreem;