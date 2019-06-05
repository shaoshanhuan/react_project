import React, { Component } from 'react';
import {Row, Col, Slider} from 'antd';
import MySliderInput from './MySliderInput';


export default class MySlider extends Component {
    constructor(props){
        super(props);

        this.state = {
            v: [0, 0]
        };
    }
    // 组件将要受到新的props，state改变不触发这个。Vue中没有这样的生命周期。
    componentWillReceiveProps(nextProps){
        // 判断是不是空数组，如果是空数组，将最大值、最小值填进去。
        const propsv = nextProps.v.length === 0 ? [nextProps.data.min * nextProps.data.rate, nextProps.data.max * nextProps.data.rate] : nextProps.v;
        // 将父亲传入v除以比例，设置为state的v
        this.setState({
            v: propsv.map(item => item / nextProps.data.rate)
        });
    }
    render() {
        // 收数据
        const {chinese, k, max, min, rate, kind} = this.props.data;
        const {v, dispatch} = this.props;

        return (
            <Row>
                <Col span={3}>
                    {chinese} ：
                </Col>
                <Col span={14}>
                    <Slider 
                        range 
                        min={min} 
                        max={max} 
                        value={this.state.v}
                        onChange={(v)=>{
                            // 这里改变组件自己的state的，让条能拖
                            this.setState({
                                v
                            });
                        }}
                        onAfterChange={(v)=>{
                            // 这里改变model，让数据变化
                            this.props.dispatch({'type': 'car/changeFilterAsync', k, 'v': v.map(item => item * rate), 'kind': 'C'});
                        }}
                    />
                </Col>
                <Col offset={1} span={24 - 15 - 3}>
                    <MySliderInput v={this.state.v} k={k} rate={rate} dispatch={dispatch} />
                </Col>
            </Row>
        );
    }
}
