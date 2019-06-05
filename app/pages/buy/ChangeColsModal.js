import React, { Component } from 'react';
import allCols from './allCols';
import {connect} from 'dva';
import ChangeColsModal_li from './ChangeColsModal_li';
import {Button} from 'antd';

@connect(
    ({colSort}) => ({
        // 本地存储里面的列的定义
        nowCols: colSort.nowCols
    })
)
export default class ChangeColsModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 已选
            arr1: [],
            // 未选
            arr2: []
        };
    }
    // 生命周期，组件加载的时候要根据全局的nowcols组建自己的arr1、arr2
    componentWillMount(){
        // 向全局发出一个改变命令，让store中的临时数组和当前数组一直
        
        let arr1 = this.props.nowCols.map(str => ({
            'k': str,
            'chinese': allCols[str].chinese
        }));

        let arr2 = [];
        for(let k in allCols){
            // 检查这项是不是存在于cols中（本地存储中）
            if(!this.props.nowCols.includes(k)){
                arr2.push({
                    'k': k,
                    'chinese': allCols[k].chinese
                });
            } 
        }

        // 不要在循环语句中写setState()
        this.setState({
            arr1,
            arr2
        });
    }

    onSortItems1(items){
        this.setState({
            arr1: items
        });
    }

    // 生命周期，无论组件何种原因改变了状态（props、state）这里是state改变
    // 都会与全局的tempCols进行同步。
    // tempCols这个量是临时周转用的
    componentDidUpdate(prevProps, prevState){
        this.props.dispatch({'type': 'colSort/changeTempCols', 'tempCols': this.state.arr1.map(item => item.k)});
    }

    // 删除
    delitem(k){
        // 数组1删除
        this.setState({
            arr1: this.state.arr1.filter(item => item.k != k),
            arr2: [
                ...this.state.arr2,
                {
                    k,
                    'chinese': allCols[k].chinese
                }
            ]
        });
    }

    
    render() {
        return (
            <div>
                <h3>当前列</h3>
                <ul className="col_ul">
                    {
                        this.state.arr1.map((item, index) => <ChangeColsModal_li 
                            key={index}
                            sortId={index}
                            onSortItems={this.onSortItems1.bind(this)}
                            items={this.state.arr1}
                            info={{item, 'delitem': this.delitem.bind(this)}}
                        />)
                    }
                </ul>
                <h3>备选列</h3>
                <ul className="col_ul">
                    {
                        this.state.arr2.map((item, index) => <li key={index} onClick={()=>{
                            // arr2数组删除我这项
                            this.setState({
                                arr2: this.state.arr2.filter(_item => item != _item)
                            });
                            // arr1数组增加我这项
                            this.setState({
                                arr1: [
                                    ...this.state.arr1,
                                    item
                                ]
                            });
                        }}>
                            <span>
                                +
                            </span>
                            {item.chinese}
                        </li>)
                    }
                </ul>
            </div>
        );
    }
}
