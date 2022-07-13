import { createContext } from "react";
import { useLocalObservable } from "mobx-react";
export const StoreContext = createContext();

/***
 * store component with mobex according to : https://www.youtube.com/watch?v=pnhIJA64ByY
 */
const StoreProvider = ({ children }) => {
    // Store
    const AppStore = useLocalObservable(() => ({
        //state:
        searchHistoryItems:[],
        photos: [],
        lastQuery: '',
        isLoading : false,
        hasMore : true,
        pageNumber: 1,
        openAlert: false,
        alertText: 'look like something went wrong...',
        //actions:
        addSearchHistoryItems: item => {
                if(!AppStore.searchHistoryItems.find(el => el.value === item)){ // if not exists already
                    AppStore.searchHistoryItems.push({value: item});
                }
        },
        setData : (key , value) => {
            AppStore[key] = value
        },
        //getters:
        get photosCount() {
            return AppStore.photos.length
        }
    }));

    return (
        <StoreContext.Provider value={AppStore}>{children}</StoreContext.Provider>
    );
};

export default StoreProvider;
