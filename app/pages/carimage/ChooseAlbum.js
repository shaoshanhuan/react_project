import React, { Component } from 'react';
import {connect} from 'dva';
import classnames from 'classnames';

@connect(
    ({carImage}) => ({
        result: carImage.result,
        album: carImage.album,
        idx: carImage.idx
    })
)
export default class ChooseAlbum extends Component {
    render() {
        const arr = [
            {'e': 'view', 'c': '外观'},
            {'e': 'inner', 'c': '内饰'},
            {'e': 'engine', 'c': '机械'},
            {'e': 'more', 'c': '细节'}
        ];

        return (
            <div className="chooseAlbum">
                {
                    arr.map(item => <p 
                        key={item.e}
                        className={classnames({'cur': this.props.album === item.e})}
                        onClick={()=>{
                            this.props.dispatch({'type': 'carImage/changeAlbum', 'album': item.e});
                        }}
                    >{item.c}（{this.props.result.images[item.e].length}）</p>)
                }
               
            </div>
        );
    }
}
