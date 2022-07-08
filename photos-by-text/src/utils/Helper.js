/**
 * This function get an array as argument, and return the last item in array
 * @param {Array} - array of data
 * @returns {*} - last item in array
 */
export const extractFlickrData = (str) => {
    str = str.substring(14)
    str = str.substring(0, str.length - 1)
    return JSON.parse(str);
};

/**
 * This function get an array as photo object, and return the url to this photo
 *  according to : https://www.flickr.com/services/api/misc.urls.html
 * @param photo object
 * @param size str with the size of the image [small,medium,large]
 * @returns {string} - url to this photo
 */
export const getFlickrPhotoUrl = (photo , size = 'small') => {
    const Suffix = {
        small : 'n',
        medium : 'z',
        large : 'h',
    }
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${Suffix[size]}.jpg`;
};
