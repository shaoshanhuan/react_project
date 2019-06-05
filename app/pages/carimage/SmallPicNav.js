import React, { Component } from 'react';
import {connect} from 'dva';
import classnames from 'classnames';
import './carimage.less';

@connect(
    ({carImage}) => ({
        result: carImage.result,
        album: carImage.album,
        idx: carImage.idx
    })
)
export default class SmallPicNav extends Component {
    constructor(props){
        super();
        this.state = {
            nowpage: parseInt(props.idx / 4)
        };
    }

    componentWillReceiveProps(nextProp){
        this.setState({
            nowpage: parseInt(nextProp.idx / 4)
        });
    }

    render() {
        // 得到图片地址数组
        let images = this.props.result.images[this.props.album];
        // 数组长度
        let amount = images.length;
        // 总页数
        let pageamount = Math.ceil(amount / 4);
        return (
            <div style={{'overflow': 'hidden', 'width': '270px'}}>
                <div className="huoche" style={{'left': -270 * this.state.nowpage + 'px'}}>
                    {
                        (()=>{
                            let arr = [];
                            for(let i = 0 ; i < pageamount; i++){
                                let temp = [];
                                for(let j = 0; j < 4 ; j++){
                                    if(i * 4 + j < amount){
                                        temp.push(<li key={j} className={classnames({
                                            'cur': i * 4 + j === this.props.idx
                                        })} onClick={()=>{
                                            this.props.dispatch({'type': 'carImage/changeIdx', 'idx': i * 4 + j});
                                        }}>
                                            <img src={`http://192.168.2.233/carimages_small/${this.props.id}/${this.props.album}/${images[i * 4 + j]}`} />
                                        </li>)
                                    }
                                }
                                arr.push(<ul key={i}>{temp}</ul>)
                            }
                            return arr;
                        })()
                    }
                </div>
                <div className="pagebar">
                    {
                        (() => {
                            let arr = [];
                            for(let i = 0 ; i < pageamount ; i++){
                                arr.push(<p key={i} onMouseEnter={()=>{
                                    this.setState({
                                        'nowpage': i
                                    });
                                }} className={classnames({
                                    'cur': i === this.state.nowpage
                                })}></p>);
                            }
                            return arr;
                        })()
                    }
                </div>                     
            </div>
        );
    }
}
