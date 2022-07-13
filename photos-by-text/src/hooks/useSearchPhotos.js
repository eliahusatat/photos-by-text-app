import {useContext, useEffect} from 'react'
import axios from 'axios'
import { extractFlickrData } from '../utils/Helper'
import {StoreContext} from "../stores/StoreProvider";
import API_CONSTANTS from "../constants/api";
import STRINGS from "../constants/strings";

/**
 * this hook send the request to flickr api according to : https://www.youtube.com/watch?v=NZKUirTtxcg
 */
 function useSearchPhotos(query, pageNumber) {

     //get the store
    const store = useContext(StoreContext);


     /**
      * if we search new query - reset  photos ,pageNumber and hasMore
      */
    useEffect(() => {
        store.setData('photos',[])
        store.setData('pageNumber',1)
        store.setData('hasMore' , true)
        // eslint-disable-next-line
    }, [query])

     /**
      * if we search new query or the same query but new page number
      * - send request to flickr api
      */
    useEffect(() => {
        if(query !== '') {
            store.setData('isLoading', true)
            let cancel
            axios({
                method: 'GET',
                url: API_CONSTANTS.FLICKR_API_URL,
                params: {
                    tags: query,
                    method: API_CONSTANTS.FLICKR_API_FUNCTION,
                    api_key: process.env.REACT_APP_BASE_URL,
                    format: 'json',
                    extras: 'date_taken,owner_name,description',
                    page: pageNumber
                },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                const json = extractFlickrData(res.data)
                // add the new photos to the array
                store.setData('photos', [...store.photos, ...json.photos.photo.map(el => {
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
                store.setData('hasMore', json.photos.photo.length > 0)
                store.setData('isLoading', false)
            }).catch(e => {
                store.setData('isLoading', false)
                // in case we send new result before the current finish
                if (axios.isCancel(e)) return;
                store.setData('alertText', STRINGS.API_ERROR)
                store.setData('openAlert', true)
            })
            return () => cancel()
        }
        // eslint-disable-next-line
    }, [query, pageNumber])

}

export default useSearchPhotos
