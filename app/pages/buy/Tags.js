import React, { Component } from 'react';
import { Tag } from 'antd';
import {connect} from 'dva';
import moment from 'moment';

// 字典
const dirctionary = {
    'color': '颜色',
    'price': '价格',
    'km': '公里数',
    'exhaust': '排放标准',
    'engine': '排量',
    'buydate': '购买日期',
    'fuel': '燃料',
    'gearbox': '变速箱',
    'brand': '品牌',
    'series': '车系'
};

@connect(
    ({car}) => ({
        filters: car.filters
    })
)
class Tags extends Component {
    // 根据k、v显示文字
    showWord(item){
        switch(item.k){
            case 'color':
            case 'engine':
            case 'exhaust':
            case 'gearbox':
            case 'fuel':
                return item.v.join(' 或 ');
            case 'brand':
            case 'series':
                return item.v;
            case 'price':
                return item.v.map(item => item + '万元').join(' 到 ');
            case 'km':
                return item.v.map(item => item / 10000 + '万公里').join(' 到 ');
            case 'buydate':
                return item.v.map(item => moment(item).format('YYYY年MM月DD日')).join(' 到 ');
        }
        return '';
    }

    render() {
        return (
            <div>
                {
                    this.props.filters.map(item => <Tag key={item.k} closable onClose={()=>{
                        // 发一个v为空数组过去，就会被删除Filter
                        this.props.dispatch({'type': 'car/changeFilterAsync', 'k': item.k, 'v': []});
                    }}>
                        {dirctionary[item.k]}: {this.showWord(item)}
                    </Tag>)
                }  
            </div>
        );
    }
}
export default Tags;