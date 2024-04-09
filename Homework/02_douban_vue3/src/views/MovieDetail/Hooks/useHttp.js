import { getMovieDetailHttp } from '../../../API/index'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
export const useHttp = async () => {
    const $route = useRoute();
    let { id } = $route.query;
    /* http */
    const res = await getMovieDetailHttp(id);
    let item = res.data.result
    /* promise */
    return item;

}