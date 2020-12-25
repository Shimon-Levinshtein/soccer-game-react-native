import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Button, TouchableWithoutFeedback, Keyboard,
    Alert, Dimensions, ScrollView, KeyboardAvoidingView
} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContaner from '../components/NumberContaner';
import Colors from '../constants/colors';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';

const StartGameScreem = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHendler = inputTaxt => {
        setEnteredValue(inputTaxt.replace(/[^0-9]/g, ''));
    };

    const resetInputHendler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        };
    });

    const confirmInputHendler = () => {
        const choseNumber = parseInt(enteredValue);
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be btween 1 and 99.', [{ text: 'Okay', style: 'destructive', onPress: resetInputHendler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(choseNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContiner}>
                <BodyText>You selected</BodyText>
                <NumberContaner>{selectedNumber}</NumberContaner>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText >Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHendler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}><Button title="Reset" onPress={resetInputHendler} color={Colors.accent} /></View>
                                <View style={{ width: buttonWidth }}><Button title="Confirm" onPress={confirmInputHendler} color={Colors.primary} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-Sans-bold',
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    // button: {
    //     // width: 100,
    //     width: Dimensions.get('window').width / 4,
    // },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContiner: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontFamily: 'open-Sans',
    },
});

export default StartGameScreem;