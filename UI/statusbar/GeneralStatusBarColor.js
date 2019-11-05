import React from 'react';
import { View, StatusBar, StyleSheet, Platform} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const styles = StyleSheet.create({
    statusBar: {
    height: STATUSBAR_HEIGHT
    }
    });
const GeneralStatusBarColor = (props) => (
    <View style={[styles.statusBar, { backgroundColor: props.backgroundColor }]}>
    <StatusBar barStyle={props.barStyle} backgroundColor={props.backgroundColor}/>
    </View>
    );
export default GeneralStatusBarColor;