import { createContext } from "react";
import { useLocalStore } from "mobx-react";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    // Store
    const AppStore = useLocalStore(() => ({
        searchHistoryItems:[],
        photos: [],
        photosTest: [{id: '52202115530',
            dateTaken: '2022-07-07 22:17:53',
            title: 'Neovet-for-your Dogs- Generic-replacement-of-Advocate.jpg',
            ownerName: 'josephmurphy6',
            secret: '0451e63c70',
            server: '65535',
        }],
        isLoading : false,
        addSearchHistoryItems: item => {
                if(!AppStore.searchHistoryItems.find(el => el.value === item)){
                    AppStore.searchHistoryItems.push({value: item});
                }
        },
        setData : (key , value) => {
            AppStore[key] = value
        },
        get bugsCount() {
            return AppStore.bugs.length;
        }
    }));

    return (
        <StoreContext.Provider value={AppStore}>{children}</StoreContext.Provider>
    );
};

export default StoreProvider;
