import { createContext } from "react";
import { useLocalStore } from "mobx-react";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    // Store
    const AppStore = useLocalStore(() => ({
        searchHistoryItems:[],
        addSearchHistoryItems: item => {
                if(!AppStore.searchHistoryItems.find(el => el.value === item)){
                    AppStore.searchHistoryItems.push({value: item});
                }
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
