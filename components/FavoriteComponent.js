import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View, Dimensions } from 'react-native';
import { MovieCard } from '../UI/MovieCard';
import { getFromLocalStorage } from '../helpers/LocalStorageHelper';
import { Loading } from "../UI/Loading";
export default class Fav extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            isLoading: false,
        };
    }

    static navigationOptions = {
        header: null,
    }

    loadData = () => {
        getFromLocalStorage('Fav')
            .then((movies) => {
                this.setState({ products: movies, isLoading: false});
            })
    }

    handleFavorite = () => {
        this.loadData()
    }

    componentDidMount() {
        this.setState({ isLoading: true});
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.loadData()
            }
        );
    }

    componentWillUnmount() {
        this.didBlurSubscription.remove();
    }


    render() {

        const renderItem = ({ item, index }) => {
            return (
                <MovieCard 
                item={item}
                index={index} 
                favorited={true} 
                onFavoriteClick={this.handleFavorite} 
                animate={true}
                />
            );
        }

        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.movieContainer}
                    numColumns={1}
                    data={this.state.products}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
                {this.state.isLoading && 
                    <Loading />
                }
            </View>
        );
    }
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f8f8f8',
        width,

    },
    movieContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f8f8f8',
        paddingTop: 20,
        width,
    },
});