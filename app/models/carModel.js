import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace: 'car',
    // 数据
    state: {
        // 所有的品牌和车系
        'allbs': {},
        // 服务器返回结果
        'results': [],
        // 条目总数
        'total': 0,
        // 当前页码
        'page': 1,
        // 每页尺寸
        'pagesize': 10,
        // 过滤器
        'filters': [
            
        ]
    },
    reducers: {
        changeResults(state, action) {
            return {
                ...state,
                'results': action.results
            };
        },
        changeTotal(state, action) {
            return {
                ...state,
                'total': action.total
            };
        },
        changePage(state, action) {
            return {
                ...state,
                'page': action.page
            };
        },
        addFilter(state, {k, v, kind}) {
            return {
                ...state,
                'filters': [
                    ...state.filters,
                    {
                        k,
                        v,
                        kind
                    }
                ]
            };
        },
        delFilter(state, {k}) {
            return {
                ...state,
                'filters': state.filters.filter(item => item.k !== k)
            };
        },
        updateFilter(state, {k, v}) {
            return {
                ...state,
                'filters': state.filters.map(item => item.k === k ? {...item, v} : item)
            };
        },
        changeAllbs(state, {allbs}){
            return {
                ...state,
                allbs
             };
        }
    },
    effects: {
        // 拉取数据
        *loadData(action, {put, select, call}){
            yield call(loadData, {put, select});
        },
        *loadBs(action, {put, select}){
            const allbs = yield axios.get('/api/allbs').then(data => data.data);
            yield put({'type': 'changeAllbs', allbs});
        },
        *changePageAsync({page}, {put, select, call}){
            // 换页
            yield put({'type': 'changePage', page});
            // 拉取数据
            yield call(loadData, {put, select});
        },
        // 改变筛选器
        *changeFilterAsync({k, v, kind}, {put, select, call}){
            // 判断当前筛选条件中有没有这个k
            // 得到filters
            const {filters} = yield select(({car}) => car);
            // 假设没有
            let isExist = false;
            // 遍历看有没有
            filters.forEach(item => {
                if(item.k === k){
                    isExist = true;
                }
            });
            // 如果当前筛选条件中已经有了
            if(isExist){
                // 那么就根据v是不是空，决定是删除还是修改
                if(v.length === 0 || v === ''){
                    yield put({'type': 'delFilter', k});
                }else {
                    yield put({'type': 'updateFilter', k, v});
                }
            }else{
                yield put({'type': 'addFilter', k, v, kind});
            }

            // 换页
            yield put({'type': 'changePage', 'page': 1});
            // 拉取数据
            yield call(loadData, {put, select});
        }
    }
};

function * loadData({put, select}){
    // 得到page、pagesize、filters
    const {page, pagesize, filters} = yield select(({car}) => car);

    // ****************************************
    // 遍历过滤器对象，组建filterobj，filterobj就是这样的：
    // 比如你的filters是：[
    //     {'k': 'color', 'v': ['红', '绿'], 'kind': 'A'},
    //     {'k': 'engine', 'v': ['1.2L', '1.6T', '1.8L'], 'kind': 'A'},
    //     {'k': 'exhaust', 'v': ['国一', '国二', '国四'], 'kind': 'A'}
    // ]
    // filterobj就要生成这样的：{'color' : '红v绿', engine: '1.2Lv1.6Tv1.8L', 'exhaust':'国一v国二v国三'}
    // ****************************************

    // 定义这个对象
    let filterobj = {};
    filters.forEach(item => {
        if(item.kind === 'A'){
            // A类是数组，
            filterobj[item.k] = item.v.join('v');
        }else if(item.kind === 'B'){
            // B类是直接发
            filterobj[item.k] = item.v;
        }else if(item.kind === 'C' || item.kind === 'D'){
            // C类是数组，用to分隔
            filterobj[item.k] = item.v.join('to');
        }
    });

    // 发出请求
    const {total, results} = yield axios.get('/api/cars?' + querystring.stringify({
        page,
        pagesize,
        ...filterobj
    })).then(data => data.data);


    yield put({'type': 'changeResults', results});
    yield put({'type': 'changeTotal', total});
}