import React, { Component } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
var R = require('ramda');

import Haha from './Haha';
import AAA from './AAA';

export default class Index extends Component {
    constructor(){
        super();
        this.state = {
            arr: [
                {
                    'k': 'engine',
                    'chinese': '发动机'
                },
                {
                    'k': 'id',
                    'chinese': '编号'
                },
                {
                    'k': 'brand',
                    'chinese': '品牌'
                },
                {
                    'k': 'series',
                    'chinese': '车系'
                },
                {
                    'k': 'price',
                    'chinese': '价格'
                }
            ]
        };
    }
    movehaha(dragIndex, hoverIndex){
        console.log(dragIndex, hoverIndex);
        // 深克隆
        let _arr = R.clone(this.state.arr);
        // 改
        _arr.splice(hoverIndex, 0, _arr.splice(dragIndex, 1)[0]);
        this.setState({
            arr: _arr
        });
    }

    render() {
        return (
            <HeaderFooterLayout>
                <DragDropContextProvider backend={HTML5Backend}>
                    <h1>我是首页</h1>
                    {
                        this.state.arr.map((item, index) => <Haha 
                            key={item.k}
                            chinese={item.chinese}
                            index={index}
                            id={item.k}
                            movehaha={this.movehaha.bind(this)}
                        />)
                    }  
                </DragDropContextProvider>


                <button onClick={()=>{
                    console.log(this.refs.aaa.state.a);
                }}>按我</button>
            </HeaderFooterLayout>
        );
    }
}
