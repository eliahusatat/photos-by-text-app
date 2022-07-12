//hooks
import useSearchPhotos from "../../hooks/useSearchPhotos";
import { useState , useContext } from "react";

//store
import {StoreContext} from "../../stores/StoreProvider";

import { observer } from "mobx-react";

//style
import './SearchBar.scss';

// Components
import Dropdown from "../Dropdown/Dropdown";
import STRINGS from "../../constants/strings";

function SearchBar() {
    const store = useContext(StoreContext);
    const [query, setQuery] = useState("");
    const [queryToSearch, setQueryToSearch] = useState("");
    const onChangeDropdown = (data) => {
        setQuery(data);
    }
    const onFormSubmit = e => {
        e.preventDefault();
        if(query !== ''){
            setQueryToSearch(query)
            store.addSearchHistoryItems(query)
            store.setData('lastQuery',query)
        }
    }
    useSearchPhotos(queryToSearch, store.pageNumber)
    return  (
        <div>
        <h1>{STRINGS.HEAD_LINE}</h1>
    <div className="side-by-side">
        <div className="container">
            <form className="nosubmit" onSubmit={onFormSubmit}>
                <input className="nosubmit" type="search"   placeholder="Search..." value={query}
                       onChange={(e) => {
                           setQuery(e.target.value)
                       }}/>
                <button type="submit" className="nosubmit"></button>
            </form>
        </div>
        {store.searchHistoryItems.length > 0 &&<Dropdown items={store.searchHistoryItems} onChangeDropdown={onChangeDropdown}></Dropdown>}
    </div>
        </div>
    )
}

export default observer(SearchBar)
