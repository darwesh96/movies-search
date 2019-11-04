import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
  } from 'react-native'
  import { colors } from "../shared/colors";


export const Loading = () => {
    return(
        <View style={styles.loading}>
          <ActivityIndicator size='large' color={colors.primaryNonDark} />
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
    backgroundColor: colors.overlay,
  }
});
