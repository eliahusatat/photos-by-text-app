import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { extractFlickrData } from '../utils/Helper'
import {StoreContext} from "../stores/StoreProvider";

export default function useSearchPhotos(query, pageNumber) {
    const store = useContext(StoreContext);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [photos, setPhotos] = useState([])
    // const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setPhotos([])
    }, [query, pageNumber])

    useEffect(() => {
        console.log('in useSearchPhotos useEffect run')
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'https://api.flickr.com/services/rest',
            params: { tags: query,
                method: 'flickr.photos.search' ,
                api_key: '059424fc193f861f0759910ce6215043',
                format: 'json',
                extras: 'date_taken,owner_name,description',
                page: pageNumber },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log('in axios then')
            let json  = extractFlickrData(res.data)
               // eslint-disable-next-line
                store.setData('photos',json.photos.photo.map(el => {
                        return {
                            id: el.id,
                            dateTaken: el.datetaken,
                            title: el.title,
                            // description: el.description,
                            ownerName: el.ownername,
                            server: el.server,
                            secret: el.secret
                        };
                    }
                        ))
            // setPhotos(prevPhotos => {
            //     return [...new Set([...prevPhotos, ...res.data.docs.map(b => b.title)])]
            //     // return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
            // })
            // setHasMore(res.data.docs.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
        // eslint-disable-next-line
    }, [query, pageNumber])

    // return { loading, error, books, hasMore }
    return { loading, error, photos}
}
