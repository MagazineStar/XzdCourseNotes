import axios from 'axios';
const BASERUL = "http://39.103.151.139"
function Http(url) {
    return axios({
        url: BASERUL + url
    })
}
function getListHttp() {
    return Http(':8000/music/playlist')
}
function getSearchHttp(keyword) {
    return Http(`:3000/search?keywords=${keyword}`)
}
export { getListHttp, getSearchHttp };