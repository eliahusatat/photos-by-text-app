import Card from "../Card/Card";
import "./CardList.css"
import {useContext} from "react";
import {StoreContext} from "../../stores/StoreProvider";

export default function CardList ({list}) {
    const store = useContext(StoreContext);

    const cells = list.map((obj,index) =>
        <div className="item" key={index}>
            {<Card photo={obj}/>}
        </div>
    )
    return (
        <div>
        <div>
            {'result for ' + store.query}
        </div>
        <div className="list-container">
            {cells}
        </div>
        </div>
    )
}
