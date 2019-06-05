import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { connect } from 'dva';
import { push } from 'react-router-redux';
import allTopRouters from '../constants/allTopRouters';

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

@connect()
class HeaderFooterLayout extends Component {
    render() {
        // 当前栏目名字
        const columnName = window.location.hash.match(/^\u0023\/(.+)\/.+$/)[1];

        return (
            <Layout>
                <Header className='header'>
                    <div className='logo' />
                    <Menu
                        theme='dark'
                        mode='horizontal'
                        defaultSelectedKeys={[columnName]}
                        style={{ lineHeight: '64px' }}
                        onClick={({key})=>{
                            // 得到to
                            const to = allTopRouters.filter(item => item.key === key)[0].to;
                            this.props.dispatch(push(to));
                        }}
                    >
                        {
                            allTopRouters.map((item) => <Menu.Item key={item.key}>{item.chinese}</Menu.Item>)
                        }
                    </Menu>
                </Header>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}
export default HeaderFooterLayout;