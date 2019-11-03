import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
  } from 'react-native'


export const Loading = () => {
    return(
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#e3b04b' />
        </View>
    );
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF88',
  }
});
