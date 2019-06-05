import React, { Component } from 'react';
import {Row, Col, Checkbox} from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class MyCheckbox extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render() {
        // 收数据
        const {chinese, k, alloptions, kind} = this.props.data;
        const {v, dispatch} = this.props;

        return (
            <Row>
                <Col span={3}>
                    {chinese} ：
                </Col>
                <Col span={21}>
                    <CheckboxGroup 
                        options={alloptions} 
                        value={v}
                        onChange={_v => {
                            dispatch({'type': 'car/changeFilterAsync', k, 'v': _v, kind});
                        }}
                    />
                </Col>
            </Row>
        );
    }
}
