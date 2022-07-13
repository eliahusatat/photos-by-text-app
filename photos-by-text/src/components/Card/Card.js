import {observer} from "mobx-react";
//style
import './Card.css';
//helper function
import {getFlickrPhotoUrl} from "../../utils/Helper"
//constants
import STRINGS from "../../constants/strings";

/***
 * card component
 * @param photo object of photo from fliker api
 * @param onClickCard: function to execute when card is clicked
 * @param size :string - small or medium
 * @param innerRef reference for the card (Optional)
 */
function Card({photo , onClickCard , size = 'small' , innerRef = null}) {
    return(
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
            <div>
            {  photo.description?.trim().length > 0  &&<div className="card-body">
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
        </div>
    )
}
export default observer(Card);
