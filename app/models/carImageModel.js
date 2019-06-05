import axios from 'axios';
import querystring from 'querystring';

export default {
    namespace: 'carImage',
    // 数据
    state: {
        result: {},
        idx: 0,
        album: 'view'
    },
    reducers: {
        changeResult(state, {result}){
            return {
                ...state,
                result
            };
        },
        changeAlbum(state, {album}){
            return {
                ...state,
                album
            };
        },
        changeIdx(state, {idx}){
            return {
                ...state,
                idx
            };
        }
    },
    effects: {
        // 改变筛选器
        *loadData({id}, {put}){
            const {result} = yield axios.get('/api/car/' + id).then(data => data.data);
            yield put({'type': 'changeResult', result});
            yield put({'type': 'changeAlbum', 'album': 'view'});
            yield put({'type': 'changeIdx', 'idx': 0});
        },
        *goNext(action, {put, select}){
            // 观察当前的idx和album
            const {idx, album, result} = yield select(({carImage}) => carImage);
            
            if(idx < result.images[album].length - 1){
                yield put({'type': 'changeIdx', 'idx': idx + 1});
            }else{
                let nextAlbum;
                if(album === 'inner'){
                    nextAlbum ='engine';
                }else if(album === 'engine'){
                    nextAlbum ='more';
                }else if(album === 'more'){
                    nextAlbum ='view';
                }else if(album === 'view'){
                    nextAlbum ='inner';
                }
                yield put({'type': 'changeAlbum', 'album': nextAlbum});
                yield put({'type': 'changeIdx', 'idx': 0});
            }
        },
        *goPrev(action, {put, select}){
            // 观察当前的idx和album
            const {idx, album, result} = yield select(({carImage}) => carImage);
            
            if(idx > 0){
                yield put({'type': 'changeIdx', 'idx': idx - 1});
            }else{
                let prevAlbum;
                if(album === 'engine'){
                    prevAlbum ='inner';
                }else if(album === 'inner'){
                    prevAlbum ='view';
                }else if(album === 'view'){
                    prevAlbum ='more';
                }else if(album === 'more'){
                    prevAlbum ='engine';
                }
                yield put({'type': 'changeAlbum', 'album': prevAlbum});
                yield put({'type': 'changeIdx', 'idx': result.images[prevAlbum].length - 1});
            }
        }
    }
};
 