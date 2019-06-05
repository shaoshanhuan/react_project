import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace: 'xxbb',
    // 数据
    state: {
        results1: [],
        results2: []
    },
    reducers: {
        changeResults1(state, {results1}){
            return {
                ...state,
                results1
            }
        },
        changeResults2(state, {results2}){
            return {
                ...state,
                results2
            }
        },
    },
    effects: {
        // 改变筛选器
        *loadData({id, brand, price, series}, {put}){
            const results1 = yield axios.get('/api/cars?brand=' + brand + '&pagesize=4&series=' + series).then(data => data.data.results);
            const results2 = yield axios.get('/api/cars?pagesize=4&price=' + (price - 3) + 'to' + (price + 3)).then(data => data.data.results);
            yield put({'type': 'changeResults1', results1});
            yield put({'type': 'changeResults2', results2});
        }
    }
};
 