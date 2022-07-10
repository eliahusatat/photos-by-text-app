import { createContext } from "react";
import { useLocalStore } from "mobx-react";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    // Store
    const AppStore = useLocalStore(() => ({
        searchHistoryItems:[],
        photos: [],
        lastQuery: '',
        isLoading : false,
        hasMore : true,
        pageNumber: 1,
        addSearchHistoryItems: item => {
                if(!AppStore.searchHistoryItems.find(el => el.value === item)){
                    AppStore.searchHistoryItems.push({value: item});
                }
        },
        setData : (key , value) => {
            AppStore[key] = value
        }
    }));

    return (
        <StoreContext.Provider value={AppStore}>{children}</StoreContext.Provider>
    );
};

export default StoreProvider;
