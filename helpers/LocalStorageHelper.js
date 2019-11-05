import AsyncStorage from '@react-native-community/async-storage';

/**
 * this function is fired when the user clicks on the favorite icon in MovieCard component.
 * @param  {name} string       The name of localstorage 'Key'.
 * @param  {props} props       props from the parent component which contians the movie informations.
 */
export const handleLocalStorageFavorites = (name, props) => {
    // check localstorage for the movie to be favorited
    checkLocalStorage(name, props.item.id)
        .then((found) => {
            if (!found) {
                // if not found then add it
                addToLocalStorage(name, props.item)
                    .then(() => {
                        // callback function to parent component to notify for changes
                        props.onFavoriteClick(props.item.id)
                    })
            } else {
                // if found then delete it
                deleteFromLocalStorage(name, props.item.id)
                    .then(() => {
                        // notify the parent component for updates
                        props.onFavoriteClick(props.item.id)
                    })
            }
        })

};

/**
 * this function checks localstorage for a certain item.
 * @param  {name} string       The name of localstorage 'Key'.
 * @param  {id}   number       the id of the item to be checked.
 * @return {boolean}           true if the item exists/false if not.
 */
export const checkLocalStorage = (name, id) => new Promise((resolve) => {
    getFromLocalStorage(name)
        .then((resItems) => {
            resolve(resItems.some(el => el.id === id));
        })
})

/**
 * this function returns all items stored in a localstorage key.
 * @param  {name} string       The name of localstorage 'Key'.
 * @param  {id}   number       the id of the item to be checked.
 * @return {object array}      an object array containing all the returned items from localstorage.
 */
export const getFromLocalStorage = (name) => new Promise((resolve) => {
    AsyncStorage.getItem(name)
        .then((resItems) => {
            // parse items from string
            let items = JSON.parse(resItems);
            if (!items) {
                //if there is no items, initiate an empty array
                items = [];
            }
            resolve(items);
        })
})

/**
 * this function adds an item to a local storage key.
 * @param  {name} string       The name of localstorage 'Key'.
 * @param  {item} object       the item to be added.
 */
export const addToLocalStorage = (name, item) => new Promise((resolve) => {
    // get the existing array from localstorage
    getFromLocalStorage(name)
        .then((resItems) => {
            // add the item to the returned array
            resItems.unshift(item)
            // store the updated array to localstorage again
            AsyncStorage.setItem(name, JSON.stringify(resItems))
                .then(() => {
                    resolve();
                })
        })
})

/**
 * this function deletes an item from a local storage key.
 * @param  {name} string       The name of localstorage 'Key'.
 * @param  {id} number         the id of the item to be deleted.
 */
export const deleteFromLocalStorage = (name, id) => new Promise((resolve) => {
    // get the existing array from localstorage
    getFromLocalStorage(name)
        .then((resItems) => {
            // remove the item from the returned array
            resItems = resItems.filter((el) => { return el.id !== id; });
            // store the updated array to localstorage again
            AsyncStorage.setItem(name, JSON.stringify(resItems))
                .then(() => {
                    resolve();
                })
        })
})
