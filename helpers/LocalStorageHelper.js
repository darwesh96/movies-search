import AsyncStorage from '@react-native-community/async-storage';

export const handleLocalStorageFavorites = (name, props) => {
    checkLocalStorage(name, props.item.id)
        .then((found) => {
            if (!found) {
                addToLocalStorage(name, props.item)
                    .then(() => {
                        props.onFavoriteClick(props.item.id)
                    })
            } else {
                deleteFromLocalStorage(name, props.item.id)
                    .then(() => {
                        props.onFavoriteClick(props.item.id)
                    })
            }
        })

};

export const checkLocalStorage = (name, id) => new Promise((resolve) => {
    getFromLocalStorage(name)
        .then((resItems) => {
            resolve(resItems.some(el => el.id === id));
        })
})

export const getFromLocalStorage = (name) => new Promise((resolve) => {
    AsyncStorage.getItem(name)
        .then((resItems) => {
            let items = JSON.parse(resItems);
            if (!items) {
                items = [];
            }
            resolve(items);
        })
})


export const addToLocalStorage = (name, item) => new Promise((resolve) => {
    getFromLocalStorage(name)
        .then((resItems) => {
            resItems.unshift(item)
            AsyncStorage.setItem(name, JSON.stringify(resItems))
                .then(() => {
                    resolve();
                })
        })
})

export const deleteFromLocalStorage = (name, id) => new Promise((resolve) => {
    getFromLocalStorage(name)
        .then((resItems) => {
            resItems = resItems.filter((el) => { return el.id !== id; });
            AsyncStorage.setItem(name, JSON.stringify(resItems))
                .then(() => {
                    resolve();
                })
        })
})
