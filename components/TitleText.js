import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


const TitleText = props => <Text style={{...styles.title, ...props.style}}>{props.children}</Text>


const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-Sans-bold',
        fontSize: 18,
    },
});

export default TitleText;