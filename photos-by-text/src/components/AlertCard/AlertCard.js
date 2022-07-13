import {observer} from "mobx-react";
//style
import './AlertCard.scss';
//hooks
import {useContext} from "react";
//store
import {StoreContext} from "../../stores/StoreProvider";

/***
 * generic alert component
 */
function AlertCard() {
    const store = useContext(StoreContext);
    return (
            store.openAlert &&<div className="Message Message--red">
                <div className="Message-icon">
                    <i className="fa fa-times"></i>
                </div>
                <div className="Message-body">
                    <p>{store.alertText}</p>
                </div>
                <button className="Message-close js-messageClose" onClick={() => (store.setData('openAlert',false))}><i className="fa fa-times"></i></button>
            </div>
    )
}
export default observer(AlertCard);
