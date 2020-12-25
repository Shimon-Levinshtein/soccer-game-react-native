import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import * as ScreenOrientation from 'expo-screen-orientation'


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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const StartScreem = props => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    const initiallGuss = genereteRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initiallGuss);
    const [pastGuesses, setPastGuesses] = useState([initiallGuss.toString()]);
    const [availableDiviceWith, setAvailableDiviceWith] = useState(Dimensions.get('window').width);
    const [availableDiviceHeight, setAvailableDiviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDiviceWith(Dimensions.get('window').width);
            setAvailableDiviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    });

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
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    };

    let listContainerStyle = styles.listContainer;

    if (availableDiviceWith < 350) {
        listContainerStyle = styles.listContainerBig;
    };

    if (availableDiviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                        <Ionicons name="md-remove" size={24} color='white' />
                    </MainButton>
                    <NumberContaner>{currentGuess}</NumberContaner>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                        <Ionicons name="md-add" size={24} color='white' />
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                    <FlatList contentContainerStyle={styles.list} keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
                </View>
            </View>
        );
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
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView> */}
                <FlatList contentContainerStyle={styles.list} keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} />
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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '90%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default StartScreem;