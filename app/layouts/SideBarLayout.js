import React, { Component } from 'react';
import { Layout, Menu, Card, Breadcrumb} from 'antd';
import HeaderFooterLayout from './HeaderFooterLayout';
import {connect} from 'dva';
import { push } from 'react-router-redux';
import allTopRouters from '../constants/allTopRouters';
import allSmallRouters from '../constants/allSmallRouters';
import { Link } from 'dva/router';

const { Content, Sider } = Layout;

@connect()
class SideBarLayout extends Component {
    render() {
        // 当前栏目英语名字
        const columnName = window.location.hash.match(/^\u0023\/(.+)\/.+$/)[1];
        // 得到当前栏目的中文名字
        const columnChinseName = allTopRouters.filter(item => item.key === columnName)[0].chinese;
        // 得到当前栏目的所有子栏目
        const list = allSmallRouters[columnName];
        // 提炼小栏目英语名字
        const smallcolumnName = window.location.hash.match(/^\u0023\/(.+)\/(.+)$/)[2];
        // 提炼小栏目中文名字
        const smallcolumnChineseName = allSmallRouters[columnName].filter(item => item.key === smallcolumnName)[0].chinese;
       
        return (
            <HeaderFooterLayout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item><Link to={'/index/index'}>首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to={'/' + columnName + '/' + allSmallRouters[columnName][0].key}>
                            {columnChinseName}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{smallcolumnChineseName}</Breadcrumb.Item>
                </Breadcrumb>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode='inline'
                            defaultSelectedKeys={[smallcolumnName]}
                            style={{ height: '100%' }}
                            onClick={({key})=>{
                                this.props.dispatch(push(`/${columnName}/${key}`));
                            }}
                        >
                            {
                                list.map(item => <Menu.Item key={item.key}>
                                    {item.chinese}
                                </Menu.Item>)
                            }
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Card>{this.props.children}</Card>
                    </Content>
                </Layout>
            </HeaderFooterLayout>
        );
    }
}
export default SideBarLayout;