import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { strings } from "../shared/strings";
import { colors } from "../shared/colors";

export const EmptyList = () => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}> {strings.emptyList} </Text>
        </View>
    );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    emptyContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryVeryLight,
    },
    emptyText: {
       fontSize: 20,
       textAlign: 'center',
       color: colors.primaryDark+65
    },
});