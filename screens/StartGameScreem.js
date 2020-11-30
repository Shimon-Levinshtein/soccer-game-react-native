import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContaner from '../components/NumberContaner';
import Colors from '../constants/colors';

const StartGameScreem = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(false);

    const numberInputHendler = inputTaxt => {
        setEnteredValue(inputTaxt.replace(/[^0-9]/g, ''));
    };

    const resetInputHendler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };
    
    const confirmInputHendler = () => {
        const choseNumber = parseInt(enteredValue);
        if(isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be btween 1 and 99.', [{text: 'Okay', style: 'destructive', onPress: resetInputHendler}])
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
                <Text>You selected</Text>
                <NumberContaner>{selectedNumber}</NumberContaner>
                <Button title='START GAME' onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text style={styles.text}>Select a Number</Text>
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
                        <View style={styles.button}><Button title="Reset" onPress={resetInputHendler} color={Colors.accent} /></View>
                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHendler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContiner: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        // fontFamily: 'open-Sans',
    },
});

export default StartGameScreem;