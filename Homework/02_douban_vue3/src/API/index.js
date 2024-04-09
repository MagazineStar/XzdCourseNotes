import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL
function Http(url) {
    return axios({
        url: BASE_URL + url
    })
}
function getTop250Http() {
    return Http("/films/top250")
}
function getMovieDetailHttp(id) {
    return Http(`/films/detail?id=${id}`)
}
export { getTop250Http, getMovieDetailHttp }