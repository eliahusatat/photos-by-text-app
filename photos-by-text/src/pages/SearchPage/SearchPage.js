// Components
import SearchBar from "../../components/SearchBar/SearchBar";
import CardList from "../../components/CardList/CardList";
import {useContext} from "react";
import {StoreContext} from "../../stores/StoreProvider";
import {observer} from "mobx-react";

function SearchPage() {
    const store = useContext(StoreContext);
    return (
            <div className="search-page">
                <SearchBar/>
                <CardList list={store.photos}/>
            </div>
    )
}
export default observer(SearchPage);
