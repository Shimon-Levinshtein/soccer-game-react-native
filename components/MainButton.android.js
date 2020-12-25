import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Colors from '../constants/colors';

const MainButton = props => {
    const ButtonComponent = TouchableOpacity;
    if (Platform.version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContiner}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
};


const styles = StyleSheet.create({
    buttonContiner: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-Sans',
        fontSize: 18,
    },
});

export default MainButton;