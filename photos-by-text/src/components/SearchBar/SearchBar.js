import { useState , useContext } from "react";
import {StoreContext} from "../../stores/StoreProvider";
import { useObserver } from "mobx-react";
//style
import './SearchBar.scss';

// Components
import Dropdown from "../Dropdown/Dropdown";


function SearchBar() {
    const store = useContext(StoreContext);
    const [query, setQuery] = useState("");
    const onChangeDropdown = (data) => {
        setQuery(data);
    }
    const onFormSubmit = e => {
        e.preventDefault();
        store.addSearchHistoryItems(query)
    }
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
    </div>
    ))
}
export default SearchBar
