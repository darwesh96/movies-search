import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, FlatList } from 'react-native';
import { MovieCard } from '../UI/MovieCard';
import { BASE_URL, API_KEY } from '../shared/apiConfigurations';
import { getFromLocalStorage } from '../helpers/LocalStorageHelper';
import { SearchInput } from "../UI/SearchInput";
import { strings } from "../shared/strings";
import { colors } from "../shared/colors";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '', // text from search input
            response: [], // response from API
            isLoading: false, // component loading state
            refresh: false, // FlatList boolean to force re-render
            favList: [], // array of favorited movies from locl storage
            width: Dimensions.get('window').width, // devices width for responsive and orientation layouts
        };
        this.timeout = 0; // timeout after the user stops typing to fire the API request
    }

    /**
     * an object that handles the properties of the action bar.
    */
    static navigationOptions = {
        header: null, // don't create an action bar
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
     * Handles the callback function of SearchInput 'onChangeText'
     * @param {string} search Text from the SearchInput
     */
    updateSearch = search => {
        // update component state with search value
        // set the component state to loading
        this.setState({
            search,
            isLoading: true
        });
        // check the search string for being empty
        if (search.trim() != '') {
            // if not empty
            // reset the timeout if the user is still typing to prevent sending too many API requests
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                // API fetchOptions
                const fetchOptions = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                };
                // send the GET request
                fetch(BASE_URL + 'search/movie?api_key=' + API_KEY + '&query=' + search, fetchOptions)
                    .then(response => {
                        // check response
                        if (response.ok) {
                            // if ok return it
                            return response;
                        } else {
                            // if not ok stop loading state
                            // and clear the response array
                            console.log(response);
                            this.setState({
                                isLoading: false,
                                response: [],
                            });
                        }
                    })
                    // convert response to json format
                    .then(response => response.json())
                    .then(res => {
                        // put the response in the component state to be rendered
                        // stop loading state
                        this.setState({
                            response: res.results,
                            isLoading: false,
                        });
                    })
                    .catch(error => {
                        // catch any errors and alert the user
                        alert(error);
                        // stop loading state
                        // and clear the response array
                        this.setState({
                            isLoading: false,
                            response: [],
                        });
                    }
                    );
            }, 800); // timeout before sending the request
        } else {
            // if search text is null or empty
            // stop loading state
            // and clear the response array
            this.setState({
                response: [],
                isLoading: false,
            });
        }
    };

    /**
     * Handles the callback function of MovieCard when the user clicks the favorite icon.
     * gets favorited movies from local storage
     */
    handleFavorite = () => {
        getFromLocalStorage(strings.favoritesLocalStorage)
            .then((movies) => {
                // put favorited movies in the state
                // force FlatList re-render to show any changes
                this.setState({ favList: movies, refresh: true })
            })

    }

    /**
     * checks a movie if it is favorited or not.
     * @param  {number} id       The movie id to be checked.
     * @return {boolean}         true if favorited / false if not.
     */
    checkMovie = (id) => {
        return this.state.favList.some(el => el.id === id);
    };

    /**
     * Clears the SearchInput.
     * This method is fired when the user presses 'x' on SearchInput.
     */
    clearInput = () => {
        // Clears the Search text
        // Clears the response object from state
        this.setState({
            search: '',
            response: [],
        })
    }

    componentDidMount() {
        // add willFocus Listener to the component
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                // load movies from localstorage again reflect any changes while being inactive
                this.handleFavorite();
            }
        );

    }
    componentWillUnmount() {
        // remove willFocus Listener before unmounting the component 
        this.didBlurSubscription.remove();
    }

    render() {
        const { search, response } = this.state;

        let flatlistdata;  // FlatList object array intialization
        // check if response is empty or searchinput text is empty
        if ((Array.isArray(response) && response.length) || search.trim() != '') {
            // if not empty
            // assign the response to the FlatList 
            flatlistdata = response;
        } else {
            // if empty
            // clear the FlatList
            flatlistdata = [];
        }

        const renderItem = ({ item, index }) => {
            return (
                <MovieCard 
                item={item} 
                index={index} 
                favorited={this.checkMovie(item.id)} 
                onFavoriteClick={this.handleFavorite} 
                />
            );
        }

        return (
            <View style={[styles.container, {width: this.state.width}]}
            onLayout={this.onLayout}>
                <SearchInput 
                    updateSearch={this.updateSearch}
                    search={this.state.search}
                    isLoading={this.state.isLoading}
                    clearInput={this.clearInput} 
                    />
                              
                <View>
                    <FlatList
                        contentContainerStyle={[styles.movieContainer, {width: this.state.width,}]}
                        numColumns={1}
                        data={flatlistdata}
                        extraData={this.state.refresh}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryDark,
        paddingTop: 20,

    },
    movieContainer: {
        paddingTop: 10,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.primaryVeryLight,
        paddingBottom: 120
    },

});