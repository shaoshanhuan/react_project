import React, { Component } from 'react';
import {Input, Button, message} from 'antd';

export default class MySliderInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            v0: 0,
            v1: 0
        };
    }

    // 组件将要受到新的props
    componentWillReceiveProps(nextProp){
        this.setState({
            v0: nextProp.v[0],
            v1: nextProp.v[1]
        });
    }

    render() {
        const {v, k, rate, dispatch} = this.props;
        const {v0, v1} = this.state;
        return (
            <div>
                <Input style={{'width': '50px'}} value={this.state.v0} onKeyDown={e=>{
                    if(e.keyCode < 49 || e.keyCode > 57){
                        // 阻止默认事件
                        e.preventDefault();
                    }
                }} onChange={e=>{
                    this.setState({
                        v0: e.target.value
                    });
                }}/>
                ~
                <Input style={{'width': '50px'}} value={this.state.v1} onChange={e=>{
                    this.setState({
                        v1: e.target.value
                    });
                }}/>
                {' '}
                <Button onClick={()=>{
                    // 判断数据合法性
                    if(this.state.v0 > this.state.v1){
                        message.error('第一个数字必须小于第二个数字');
                        // 换回初始状态，初始状态一直在props里面存着呢，没有变化过。
                        this.setState({
                            v0: v[0],
                            v1: v[1]
                        });
                    }else{
                        this.props.dispatch({'type': 'car/changeFilterAsync', k, 'v': [v0 * rate, v1 * rate], 'kind': 'C'});
                    }
                }}>
                    确定
                </Button>
            </div>
        );
    }
}
