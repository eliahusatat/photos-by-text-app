import {useContext, useEffect} from 'react'
import axios from 'axios'
import { extractFlickrData } from '../utils/Helper'
import {StoreContext} from "../stores/StoreProvider";

 function useSearchPhotos(query, pageNumber ) {
    const store = useContext(StoreContext);
    useEffect(() => {
        store.setData('photos',[])
        store.setData('pageNumber',1)
        // eslint-disable-next-line
    }, [query])

    useEffect(() => {
        console.log('in useSearchPhotos useEffect run')
        store.setData('isLoading' , true)
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
            let json  = extractFlickrData(res.data)
            // eslint-disable-next-line
            store.setData('photos', [...store.photos , ...json.photos.photo.map(el => {
                    return {
                        id: el.id,
                        dateTaken: el.datetaken,
                        title: el.title,
                        description: el.description._content,
                        ownerName: el.ownername,
                        server: el.server,
                        secret: el.secret
                    };
                }
            )])
            //  eslint-disable-next-line
            store.setData('hasMore' , json.photos.photo.length > 0)
            store.setData('isLoading' , false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            // setError(true)
        })
        return () => cancel()
        // eslint-disable-next-line
    }, [query, pageNumber])

}

export default useSearchPhotos
