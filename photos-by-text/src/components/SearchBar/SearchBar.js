import { useState , useContext } from "react";
import {StoreContext} from "../../stores/StoreProvider";
import { useObserver } from "mobx-react";
//style
import './SearchBar.scss';

// Components
import Dropdown from "../Dropdown/Dropdown";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

//hooks
import useSearchPhotos from "../../hooks/useSearchPhotos";


function SearchBar() {
    const store = useContext(StoreContext);
    const [query, setQuery] = useState("");
    const [queryToSearch, setQueryToSearch] = useState("");
    const onChangeDropdown = (data) => {
        setQuery(data);
    }
    const onFormSubmit = e => {
        e.preventDefault();
        setQueryToSearch(query)
        store.addSearchHistoryItems(query)
        console.log('store.addSearchHistoryItems(query)')
        // store.setData('isLoading' , !store.isLoading)
    }
    const { loading, error, photos} = useSearchPhotos(queryToSearch, 1)
    console.log(loading)
    console.log(error)
    console.log(photos)
    return useObserver(() => (
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
        {store.isLoading && <LoadingSpinner />}
    </div>
    ))
}
export default SearchBar
