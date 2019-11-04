import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { IMAGE_URL } from '../shared/apiConfigurations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { handleLocalStorageFavorites } from '../helpers/LocalStorageHelper';
import { handleShare } from '../helpers/ShareHelper';
import { strings } from "../shared/strings";
import { colors } from "../shared/colors";

export const MovieCard = (props) => {
    let width= Dimensions.get('window').width;
    const onLayout = (e) => {
        console.log('moviecard')
         width= Dimensions.get('window').width;
       }
    return (
        <View style={[styles.card,{width: width - 20}]} key={props.index}
        onLayout={onLayout}>
            <View style={styles.cardLeft}>
                <View style={styles.imageContainer}>
                    {props.item.backdrop_path ?
                        <Image style={styles.leftImage} source={{ uri: IMAGE_URL + 'w500/' + props.item.backdrop_path }} />
                        : 
                        <Image style={styles.leftImage} source={require('../Assets/Images/no-preview.png')} />}
                </View>
            </View>
            <View style={styles.cardRight}>
                <View style={styles.cardRightInfo}>
                    <View style={styles.itemContainer}>
                        {props.item.release_date ?
                            <Text style={[styles.itemText,{width: width - 200,}]} numberOfLines={1}>
                                {props.item.title} ({props.item.release_date.slice(0, 4)})
                            </Text>
                            : 
                            <Text style={[styles.itemText,{width: width - 200,}]} numberOfLines={1}>
                                {props.item.title}
                            </Text>}
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={[styles.itemText,{width: width - 200,}]}> {props.item.vote_average} </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        <Text style={[styles.itemText,{width: width - 200,}]}> {props.item.original_language} </Text>
                    </View>
                    <View style={styles.itemContainer}>
                        {props.item.release_date ?
                            <Text style={[styles.itemText,{width: width - 200,}]}>
                                {props.item.release_date.slice(8, 10)}-{props.item.release_date.slice(5, 7)}-{props.item.release_date.slice(0, 4)}
                            </Text>
                            : 
                            <Text></Text>}

                    </View>
                </View>
                <View style={styles.cardRightActions}>
                    <TouchableOpacity activeOpacity={0.4}
                        onPress={() => {
                            handleShare(props.item);
                        }}>
                        <Ionicons name={'md-share'} size={22} color={'#2b2b2880'} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.4}
                        onPress={() => {
                            handleLocalStorageFavorites(strings.favoritesLocalStorage, props);
                        }}>
                        {!props.favorited &&
                            <Ionicons name={'md-star-outline'} size={27} color={'#e3b04b'} />
                        }
                        {props.favorited &&
                            <Ionicons name={'md-star'} size={27} color={'#e3b04b'} />
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

};


const styles = StyleSheet.create({
    card: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: colors.white,
        marginBottom: 15,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
        paddingRight: 20

    },
    cardRight: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexDirection: 'row',
        paddingLeft: 10,

    },
    cardLeft: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    imageContainer: {
        justifyContent: 'center',
    },
    leftImage: {
        height: 160,
        width: 140,
        borderRadius: 5,
    },

    itemContainer: {
        margin: 5,
        alignItems: 'flex-start',
        textAlign: 'center'
    },
    itemText: {
        color: colors.primaryDark,
        fontSize: 14,
        
    },
    cardRightInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cardRightActions: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingTop: 12,
        paddingBottom: 12,
        marginLeft: -10
    },
});