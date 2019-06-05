import React from 'react';
import moment from 'moment';
import { Link } from 'dva/router';

export default {
    
    'id': {
        'chinese': 'id'
    },
    'brand': {
        'chinese': '品牌'
    },
    'series': {
        'chinese': '车系'
    },
    'color': {
        'chinese': '颜色'
    },
    'engine': {
        'chinese': '排量'
    },
    'exhaust': {
        'chinese': '环保标准'
    },
    'fuel': {
        'chinese': '燃料'
    },
    'gearbox': {
        'chinese': '变速箱'
    },
    'km': {
        'chinese': '公里数（万km）',
        render(v){
            return <span>{Math.round(v / 1000) / 10}</span>;
        }
    },
    'price': {
        'chinese': '价格（万元）'
    },
    'buydate': {
        'chinese': '购买日期',
        render(v){
            return <span>{moment(v).format('YYYY年MM月DD日')}</span>;
        }
    },
    'img': {
        'chinese': '图片',
        render(v, record){
            return <Link to={'/carimage/' + record.id}><img alt="" src={'http://192.168.2.233/' + v} /></Link>;
        }
    }
};