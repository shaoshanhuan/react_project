import React, { Component } from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Table, Modal, Button} from 'antd';
import SideBarLayout from '../../layouts/SideBarLayout';
import MyCheckbox from './MyCheckbox';
import MyCanlendar from './MyCanlendar';
import MySlider from './MySlider';
import BsFilter from './BsFilter';
import ChangeColsModal from './ChangeColsModal';
import allCols from './allCols';
import Tags from './Tags';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import './buy.less';

// 所有过滤器条，UI组建将根据这个数据进行视图的渲染
// 为什么不把他放到STATE中呢？？因为它不变化，是常量。
// A表示复选框
const allFilterBarsData = [
    {
        'chinese': '颜色',
        'k': 'color',
        'alloptions': ['红', '黄', '绿', '橙', '黑', '白', '灰', '银灰', '咖啡', '蓝'],
        'kind': 'A'
    },
    {
        'chinese': '排放标准',
        'k': 'exhaust',
        'alloptions': ['国一', '国二', '国三', '国四', '国五'],
        'kind': 'A'
    },
    {
        'chinese': '发动机排量', 
        'k': 'engine', 
        'alloptions': ['1.2L', '1.4L', '1.6L', '1.8L', '1.8T', '2.0L', '2.0T', '3.0L', '3.0T', '4.0L', '4.0T'],
        'kind': 'A'
    },
    {
        'chinese': '变速箱', 
        'k': 'gearbox', 
        'alloptions': ['手动', '自动', '手自一体'],
        'kind': 'A'
    },
    {
        'chinese': '燃料', 
        'k': 'fuel', 
        'alloptions': ['汽油', '柴油', '纯电动', '油电混合'],
        'kind': 'A'
    },
    {
        'chinese': '售价（万元）', 
        'k': 'price', 
        'max': 120,
        'min': 0,
        'rate': 1,
        'kind': 'C'
    },
    {
        'chinese': '公里（万公里）', 
        'k': 'km', 
        'max': 200,
        'min': 0,
        'rate': 10000,
        'kind': 'C'
    },
    {
        'chinese': '购买日期', 
        'k': 'buydate',
        'kind': 'D'
    }
];


@connect(
    ({car, colSort}) => ({
        results: car.results,
        page: car.page,
        pagesize: car.pagesize,
        total: car.total,
        filters: car.filters,
        nowCols: colSort.nowCols,
        tempCols: colSort.tempCols
    })
)
class Buy extends Component {
    constructor(){
        super();
        this.state = {
            isShowModal: false,
            // 当前列的排序，用于周转
            tempCols: []
        };
    }
    componentWillMount() {
        // 互换两个东西
        this.props.dispatch({'type': 'car/loadData'});
        this.props.dispatch({'type': 'colSort/loadColsFromLoacalStorage'});
    }
    
    // 改变TempCols
    changeTempCols(tempCols){
        this.setState({
            tempCols
        });
    }

    // 根据类型显示组件
    showFilterBar(data) {
        // 要传入子组件的属性
        const propsobj = {
            key: data.k,
            data: data,
            v: this.getVbyK(data.k),
            dispatch: this.props.dispatch
        };

        if(data.kind === 'A'){
            // 复选框
            return <MyCheckbox {...propsobj} />;
        }else if(data.kind === 'C'){
            return <MySlider {...propsobj} />;
        }else if(data.kind === 'D'){
            return <MyCanlendar {...propsobj} />;
        }
    }
    // 根据k从model中的filters中得到v
    getVbyK(k){
        for(let i = 0 ; i < this.props.filters.length ; i++){
            if(this.props.filters[i].k === k){
                return this.props.filters[i].v;
            }
        }
        return [];
    }

    render() {
        return (
            <SideBarLayout>
                <h1>{this.props.m}</h1>
                {/* 过滤器，汽车品牌、车系的过滤器，单独放出来的 */}
                <BsFilter />
                {/* 遍历普通的过滤器，比如复选框、slider等等 */}
                {
                    allFilterBarsData.map(item => this.showFilterBar(item))
                }
                {/* 标签 */}
                <Tags />
                
                <div className="tool_bar">
                    <div className="left_part">
                        <h3>共{this.props.total}辆车复合条件</h3>
                    </div>
                    <div className="right_part">
                        <Button className="btn" type="primary" shape="circle" icon="setting" onClick={()=>{
                            this.setState({
                                isShowModal: true
                            });
                        }}></Button>
                    </div>
                </div>
                {/* 大表格 */}
                <Table
                    rowKey='id'
                    dataSource={this.props.results}
                    columns={this.props.nowCols.map(item => ({
                        dataIndex: item,
                        key: item,
                        title: allCols[item].chinese,
                        render(v){
                            return allCols[item].hasOwnProperty('render') ? allCols[item].render(v) : v;
                        }
                    }))}
                    pagination={{
                        total: this.props.total,
                        current: this.props.page,
                        pageSize: this.props.pagesize,
                        onChange: (page) => {
                            this.props.dispatch({'type': 'car/changePageAsync', page});
                        }
                    }}
                />

                {/* 调整列顺序的模态框 */}
                <Modal
                    title="调整列顺序的模态框"
                    visible={this.state.isShowModal}
                    onOk={()=>{
                        this.props.dispatch({'type': 'colSort/changeLoacalStorage', 'nowCols': this.props.tempCols});
                        this.setState({
                            isShowModal: false
                        });
                    }}
                    onCancel={()=>{
                        this.setState({
                            isShowModal: false
                        });
                    }}
                    destroyOnClose={true}
                >
                    <ChangeColsModal />
                </Modal>
            </SideBarLayout>
        );
    }
}
export default Buy;