import { useObserver } from "mobx-react";
// import React, { useEffect } from 'react';
//style
import './Card.css';

import {getFlickrPhotoUrl} from "../../utils/Helper"



function Card({photo}) {
    // useEffect (() => {
    //     console.log('in Card')
    //     console.log(photo)
    // }, [photo]);
    return useObserver(() => (
        <div className="card-container">
            <div className="image-container">
                <img src={getFlickrPhotoUrl(photo)} alt="" />
            </div>
            <div className="card-title">
                <h3>{photo.title}</h3>
            </div>
            <div className="card-body">
                <p>{photo.description}
                </p>
            </div>
        </div>
    ))
}
export default Card
