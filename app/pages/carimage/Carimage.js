import React, { Component } from 'react';
import {connect} from 'dva';
import {Drawer} from 'antd';
import ChooseAlbum from './ChooseAlbum';
import SmallPicNav from './SmallPicNav';
import moment from 'moment';
import Xxbb from './Xxbb';

import './carimage.less';

@connect(
    ({carImage}) => ({
        result: carImage.result,
        album: carImage.album,
        idx: carImage.idx
    })
)
export default class Carimage extends Component {
    constructor(props){
        super();
        this.state = {
            isShowDrawer: false
        };
    }

    // 上树发请求
    componentWillMount(){
        const id = this.props.match.params.id;
        this.props.dispatch({'type': 'carImage/loadData', id});
    }

     // 更新也发请求
    componentWillReceiveProps(nextProps){
        if(nextProps.match.params.id != this.props.match.params.id){
            this.props.dispatch({'type': 'carImage/loadData', 'id': nextProps.match.params.id});
        }
    }

    componentDidMount(){
       
    }

    
    render() {
        // 当组件的全局数据还没有回来，即没有images属性的时候，不渲染
        if(!this.props.result.hasOwnProperty('images')){
            return null;
        }
        const id = this.props.match.params.id;
        const {album, idx, result} = this.props;
        const picname = result.images[album][idx];

        return (
            <div className="box_wrap">
                <div className="bigimg_wrap">
                    <div className="inner">
                        <img className="bigimg" src={`http://192.168.2.233/carimages/${id}/${album}/${picname}`} />
                        <div className="cover_left" onClick={()=>{
                            this.props.dispatch({'type': 'carImage/goPrev'});
                        }}></div>
                        <div className="cover_right" onClick={()=>{
                            this.props.dispatch({'type': 'carImage/goNext'});
                        }}></div>
                        
                    </div>
                </div>
                <div className="right_wrap">
                    <h3>
                        {result.brand}{result.series}{result.price}万{result.color}色{result.exhaust}{result.engine}{Math.round(result.km / 10000)}万公里{moment(result.buydate).format('YYYY')}年
                    </h3>
                    <ChooseAlbum />
                    <SmallPicNav id={id}/>
                </div>

                <div className="xxbbbtn" onClick={()=>{
                    this.setState({
                        isShowDrawer: true
                    });
                }}>相似宝贝</div>

                {/* 抽屉 */}
                <Drawer
                    title="相似宝贝"
                    placement={'bottom'}
                    closable={false}
                    onClose={()=>{
                        this.setState({
                            isShowDrawer: false
                        });
                    }}
                    visible={this.state.isShowDrawer}
                    height={300}
                >
                    <Xxbb id={id} brand={result.brand} price={result.price} series={result.series} />
                </Drawer>
            </div>
        )
    };
}
