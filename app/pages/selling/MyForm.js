import React, { Component } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
  } from 'antd';

class MyForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 3 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 21 },
            },
        };
        // 被装饰的结果是奖励了你一个新的装饰器
        const { getFieldDecorator } = this.props.form;

        return (
            <Form {...formItemLayout}>
                <Form.Item label="E-mail">
                    {
                        getFieldDecorator(
                            'email',
                            {
                                rules: [
                                    {
                                        type: 'email',
                                        message: '请输入正确的Email地址',
                                    },
                                    {
                                        required: true,
                                        message: '必须填写此项'
                                    }
                                ],
                              }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item label="姓名">
                    {
                        getFieldDecorator(
                            'name',
                            {
                                rules: [
                                    {
                                        // 正则式
                                        pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
                                        message: '请输入正确的姓名'
                                    },
                                    {
                                        required: true,
                                        message: '必须填写此项'
                                    }
                                ],
                              }
                        )(<Input />)
                    }
                </Form.Item>
                <Form.Item label="手机号">
                    {
                        getFieldDecorator(
                            'mobile',
                            {
                                rules: [
                                    {
                                        // 正则式
                                        pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
                                        message: '请输入正确的手机号'
                                    },
                                    {
                                        required: true,
                                        message: '必须填写此项'
                                    }
                                ],
                              }
                        )(<Input />)
                    }
                </Form.Item>
            </Form>
        );
    }
}
export default Form.create({ name: 'sellingform' })(MyForm);
