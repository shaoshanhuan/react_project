import React, { Component } from 'react';
import {Row, Col, DatePicker} from 'antd';
import moment from 'moment';
 
const { RangePicker } = DatePicker;

export default class MyCanlendar extends Component {
    render() {
        // 收数据
        const {chinese, k, alloptions, kind} = this.props.data;
        const {v, dispatch} = this.props;

        return (
            <Row>
                <Col span={3}>
                    {chinese}：
                </Col>
                <Col span={21}>
                    <RangePicker
                        value={v.length == 0 ? null : v.map(item => moment(item))}
                        onChange={(v)=>{
                            console.log(v);
                            dispatch({'type': 'car/changeFilterAsync', k, 'v': v.map(item => item.unix() * 1000), kind});
                        }}
                        allowClear={false}
                    />
                </Col>
            </Row>
        );
    }
}
