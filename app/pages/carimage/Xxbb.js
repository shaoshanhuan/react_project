import React, { Component } from 'react';
import {connect} from 'dva';
import {Row, Col} from 'antd';
import moment from 'moment';
import { Link } from 'dva/router';

@connect(({xxbb}) => ({
    results1: xxbb.results1,
    results2: xxbb.results2
}))
export default class Xxbb extends Component {
    componentWillMount(){
        this.props.dispatch({'type': 'xxbb/loadData', 'id': this.props.id, 'brand': this.props.brand, 'price': this.props.price, 'series': this.props.series});
    }
    render() {
        // 找3辆
        let _results1 = [];
        this.props.results1.forEach(item => {
            if(item.id != this.props.id && _results1.length < 3){
                _results1.push(item);
            }
        });
        let _results2 = [];
        this.props.results2.forEach(item => {
            if(item.id != this.props.id && _results2.length < 3){
                _results2.push(item);
            }
        });

        return (
            <div>
                <Row>
                    <Col span={12}>
                    <h3>更多{this.props.brand}{this.props.series}：</h3>
                        <Row>
                            {
                                _results1.map(item => <Col key={item.id} span={8} style={{'textAlign': 'center'}}>
                                    <Link to={'/carimage/' + item.id}>
                                        <p>
                                            <img src={`http://192.168.2.233/${item.img}`} />
                                        </p>
                                        <p>
                                        {item.brand}{item.series}{item.price}万{item.color}色{item.exhaust}{item.engine}{Math.round(item.km / 10000)}万公里{moment(item.buydate).format('YYYY')}年
                                        </p>
                                    </Link>
                                </Col>)
                            }
                        </Row>
                    </Col>
                    <Col span={12}> 
                        <h3>更多相似价格车辆：</h3>
                        <Row>
                            {
                                _results2.map(item => <Col key={item.id} span={8} style={{'textAlign': 'center'}}>
                                    <Link to={'/carimage/' + item.id}>
                                        <p>
                                            <img src={`http://192.168.2.233/${item.img}`} />
                                        </p>
                                        <p>
                                        {item.brand}{item.series}{item.price}万{item.color}色{item.exhaust}{item.engine}{Math.round(item.km / 10000)}万公里{moment(item.buydate).format('YYYY')}年
                                        </p>
                                    </Link>
                                </Col>)
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
