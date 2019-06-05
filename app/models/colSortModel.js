export default {
    namespace: 'colSort',
    state: {
        nowCols: [],
        // 为了子组件、父组件通信，创建的全局的数据
        tempCols: []
    },
    reducers: {
        changeNowCols(state, {nowCols}){
            return {
                ...state,
                nowCols
            };
        },
        changeTempCols(state, {tempCols}){
            return {
                ...state,
                tempCols
            };
        }
    },
    effects: {
        // 从本地存储中得到列顺序
        *loadColsFromLoacalStorage(action, {put}){
            // 检查本地存储中是不是有一个cols项
            let cols = localStorage.getItem('cols');
            // 如果是null，存一个
            if(cols === null){
                // 把最基本的存入
                cols = JSON.stringify(['img', 'brand', 'series', 'price']);
                localStorage.setItem('cols', cols);
            }
            // 转为对象
            cols = JSON.parse(cols);
            
            yield put({'type': 'changeNowCols', 'nowCols': cols});
        },
        // 从本地存储中得到列顺序
        *changeLoacalStorage({nowCols}, {put}){
            // 本地存储
            yield localStorage.setItem('cols', JSON.stringify(nowCols));
            
            // 改变列就行
            yield put({'type': 'changeNowCols', nowCols});
        }
    }
};