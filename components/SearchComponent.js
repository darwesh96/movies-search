import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TextInput, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MovieCard } from '../UI/MovieCard';
import { BASE_URL, API_KEY } from '../shared/apiConfigurations';
import { Loading } from '../UI/Loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getFromLocalStorage } from '../helpers/LocalStorageHelper';
export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            response: [],
            isLoading: false,
            loading: false,
            refresh: false,
            favList: [],
            favorited: false

        };
        this.timeout = 0;

    }
    static navigationOptions = {
        header: null,
    }

    updateSearch = search => {
        this.setState({
            search,
            isLoading: true
        });
        if (search.trim() != '') {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                //search function

                const fetchOptions = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                };
                fetch(BASE_URL + 'search/movie?api_key=' + API_KEY + '&query=' + search, fetchOptions)
                    .then(response => {
                        if (response.ok) {
                            return response;
                        } else {
                            console.log(response);
                            this.setState({
                                isLoading: false,
                            });
                        }
                    })
                    .then(response => response.json())
                    .then(res => {
                        this.setState({
                            response: res.results,
                            isLoading: false,
                        });
                    })
                    .catch(error => {
                        alert(error);
                        this.setState({
                            isLoading: false,
                        });
                    }
                    );

            }, 800);
        } else {
            this.setState({
                response: [],
                isLoading: false,
            });
        }
    };

    handleFavorite = () => {
        getFromLocalStorage('Fav')
            .then((movies) => {
                this.setState({ favList: movies, refresh: true })
            })

    }
    checkMovie = (id) => {
        return this.state.favList.some(el => el.id === id);
    };
    componentDidMount() {
        this.didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                this.handleFavorite();
            }
        );

    }
    componentWillUnmount() {
        this.didBlurSubscription.remove();
    }

    render() {
        const { search, response } = this.state;

        let flatlistdata;
        if ((Array.isArray(response) && response.length) || search.trim() != '') {
            flatlistdata = response;
        } else {
            flatlistdata = [];
        }

        const renderItem = ({ item, index }) => {
            return (
                <MovieCard 
                item={item} 
                index={index} 
                favorited={this.checkMovie(item.id)} 
                onFavoriteClick={this.handleFavorite} 
                animate={false}
                />
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Find a Movie..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    {this.state.isLoading &&
                        <ActivityIndicator
                            style={styles.loadingIcon}
                            size="small" color="#e3b04b" />
                    }

                    {!this.state.isLoading && search === '' &&
                        <Ionicons
                            style={[styles.loadingIcon, { top: 13 }]}
                            name={'md-search'} size={27} color={'#e3b04b'} />
                    }

                    {!this.state.isLoading && search != '' &&
                        <TouchableOpacity activeOpacity={0.4}
                            style={[styles.loadingIcon, { top: 13 }]}
                            onPress={() => {
                                this.setState({
                                    search: '',
                                    response: [],
                                })
                            }}>
                            <Ionicons
                                name={'md-close'} size={25} color={'#e3b04b'} />
                        </TouchableOpacity>

                    }

                </View>
                <View>
                    <FlatList
                        contentContainerStyle={styles.movieContainer}
                        numColumns={1}
                        data={flatlistdata}
                        extraData={this.state.refresh}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
                {this.state.loading &&
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
        paddingTop: 20,
        width,

    },
    movieContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f8f8f8',
        width,
        paddingBottom: 120
    },
    searchInput: {
        width: '90%',
        backgroundColor: '#f1d6ab',
        borderRadius: 10,
        height: 50,
        paddingLeft: 20,
        color: '#2b2b28',
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingIcon: {
        position: 'absolute',
        right: 10,
        top: 15
    }

});