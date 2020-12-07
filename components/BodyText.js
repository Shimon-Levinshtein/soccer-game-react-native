import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


const BodyText = props => <Text style={{...styles.body, ...props.style}}>{props.children}</Text>


const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-Sans',

    },
});

export default BodyText;