import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Dimensions } from 'react-native';
import { MovieCard } from '../UI/MovieCard';
import { getFromLocalStorage } from '../helpers/LocalStorageHelper';
import { Loading } from "../UI/Loading";
import { EmptyList } from "../UI/emptyList";
import { strings } from "../shared/strings";
import { colors } from "../shared/colors";

export default class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [], // array that contains all the movies after getting them from local storage
            isLoading: false, // boolean that controls the activity indicator of the component
            width: Dimensions.get('window').width, // devices width for responsive and orientation layouts
        };
    }

    /**
     * an object that handles the properties of the action bar.
    */
    static navigationOptions = {
        title: strings.favoriteTitle, // string the containes the title of the action bar
        headerStyle: {
            backgroundColor: colors.primaryDark,  // backgorund color of the action bar
          },
          headerTintColor: colors.primaryNonDark, // color of the action bar title
          headerTitleStyle: {
            fontWeight: 'bold', // font weight of the action bar title
          },
    }

    /**
     * This method is fired immediately once the layout has been calculated or changed.
     * It is used here to re calculate the device width on orientation change for responsive design.
     */
    onLayout = () => {
        // sets the new device width to the component state.
        this.setState({
         width: Dimensions.get('window').width,
        })
       }

    /**
     * This method is used to get all user's favorited movies from local storage.
     */
    loadData = () => {
        // get movies from local storage
        getFromLocalStorage(strings.favoritesLocalStorage)
            .then((movies) => {
                // store response in the component state
                // set the loading state to false
                this.setState({ movies: movies, isLoading: false});
            })
    }

    /**
     * This method is fired to handle the callback function when the user deletes a movies from local storage favorites.
     */
    handleFavorite = () => {
        // load data from localstorage again to update the list after deletion 
        this.loadData()
    }

    componentDidMount() {
        // set component state to loading to initiate activity indicator 
        this.setState({ isLoading: true});
        // add willFocus Listener to the component
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                // load data from localstorage again to check for any movies that have been added while inactive 
                this.loadData()
            }
        );
    }

    componentWillUnmount() {
        // remove willFocus Listener before unmounting the component 
        this.didBlurSubscription.remove();
    }

    render() {
        const { movies, width, isLoading } = this.state;

        const renderItem = ({ item, index }) => {
            return (
                <MovieCard 
                item={item}
                index={index} 
                favorited={true} 
                onFavoriteClick={this.handleFavorite} 
                />
            );
        }
        if(isLoading){
            return(
                <Loading />
            );
        }
        else if((!Array.isArray(movies) || !movies.length)){
            return (
               <EmptyList />
            );
        } 
        else{
        return (
            <View style={[styles.container, {width: this.state.width}]}
            onLayout={this.onLayout}>
                <FlatList
                    contentContainerStyle={[styles.movieContainer, {width: this.state.width}]}
                    numColumns={1}
                    data={movies}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryVeryLight,

    },
    movieContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryVeryLight,
        paddingTop: 10,
    },
});