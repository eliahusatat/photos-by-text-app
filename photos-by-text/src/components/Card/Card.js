import { useObserver } from "mobx-react";

//style
import './Card.css';

import {getFlickrPhotoUrl} from "../../utils/Helper"
import STRINGS from "../../constants/Strings";


function Card({photo , onClickCard , size = 'small' , innerRef = null}) {
    return useObserver(() => (
        <div className={'card-container-'+ size} onClick={onClickCard}>
            <div className={'image-container-'+ size}>
                { innerRef ?
                    <img ref={innerRef} src={getFlickrPhotoUrl(photo, size)} alt="" />
               :
                    <img src={getFlickrPhotoUrl(photo, size)} alt="" />
                }
            </div>
            <div className="card-title">
                <h3>{STRINGS.OWNER +photo.ownerName}</h3>
            </div>
            <div className="card-title">
                <h4>{STRINGS.TAKEN_ON + photo.dateTaken}</h4>
            </div>
            {  photo.description?.length > 0 && <div className="card-body">
                <h5>{STRINGS.DESCRIPTION}</h5>
                {photo.description?.length < 80 || size === 'medium' ?
                    <div dangerouslySetInnerHTML={{__html: photo.description}}></div>
                    :
                    <div>
                        <div>{photo.description?.substring(0, 80) + '...'}</div>
                        <div className="read-more-link">{STRINGS.READ_MORE}</div>
                    </div>
                }
            </div>
            }
        </div>
    ))
}
export default Card;
