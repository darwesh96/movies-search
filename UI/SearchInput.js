import React from 'react';
import { StyleSheet, TextInput, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { strings } from "../shared/strings";
import { colors } from "../shared/colors";


export const SearchInput = (props) => {
    return (
        <View style={styles.searchContainer}>
        <TextInput
            disableFullscreenUI={true}
            style={styles.searchInput}
            placeholder={strings.searchInput}
            onChangeText={props.updateSearch}
            value={props.search}
        />
        {props.isLoading &&
            <ActivityIndicator
                style={[styles.loadingIcon,{right:8, top:11 }]}
                size="small" color="#e3b04b" />
        }
        {!props.isLoading && props.search === '' &&
            <Ionicons
                style={styles.loadingIcon}
                name={'md-search'} size={27} color={'#e3b04b'} />
        }
        {!props.isLoading && props.search != '' &&
            <TouchableOpacity activeOpacity={0.4}
                style={styles.loadingIcon}
                onPress={props.clearInput}>
                <Ionicons
                    name={'md-close'} size={25} color={'#e3b04b'} />
            </TouchableOpacity>
        }
    </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        width: '90%',
        backgroundColor: colors.primaryLight,
        borderRadius: 10,
        height: 50,
        paddingLeft: 20,
        color: colors.primaryDark,
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIcon: {
        position: 'absolute',
        right: 0,
        top: 13,
        width:30,
        height:30
    }
});