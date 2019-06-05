import React, { Component } from 'react';
import {Tabs, Row, Col } from 'antd';
import {connect} from 'dva';
import classnames from 'classnames';
const { TabPane } = Tabs;

@connect(
    ({car}) => ({
        allbs: car.allbs,
        filters: car.filters
    })
)
class BsFilter extends Component {
    constructor(){
        super();

        this.state = {
            nowChar: 'A',
            realChar: 'A',
            activeKey: 'A',
            series: []
        };
    }

    // 生命周期：组件将要上树
    componentWillMount(){
        this.props.dispatch({'type': 'car/loadBs'});
    }

    // 生命周期：组件收到了新的props。注意，因为我们装饰了，所以全局的数据也算作组件的props
    // 所以model中的brand一改变，这个生命周期也能够触发。
    componentWillReceiveProps(nextProps){
        // 得到当前正在筛选的品牌
        const bb = nextProps.filters.filter(item => item.k === 'brand');
        const nowBrand = bb.length ? bb[0].v : '';

        
        if(nextProps.allbs[this.state.realChar][nowBrand]){
            this.setState({
                series: nextProps.allbs[this.state.realChar][nowBrand]
            });
        }
    }

    render() {
        // 得到当前正在筛选的品牌
        const bb = this.props.filters.filter(item => item.k === 'brand');
        const nowBrand = bb.length ? bb[0].v : '';
        // 得到当前正在筛选的车系
        const ss = this.props.filters.filter(item => item.k === 'series');
        const nowSeries = ss.length ? ss[0].v : '';
 
        return (
            <div>
                
                <Row style={{'height': '80px'}}>
                    <Col span={3}>
                        品牌：
                    </Col>
                    <Col span={21} onMouseLeave={()=>{
                        // 换nowchar
                        this.setState({
                            'activeKey': this.state.realChar
                        });
                    }}>
                        <Tabs activeKey={this.state.activeKey} onChange={(k) => {
                            // 换nowchar
                            this.setState({
                                'nowChar': k,
                                'activeKey': k
                            });
                        }}>
                            {
                                Object.keys(this.props.allbs).map(char => <TabPane key={char} tab={char} >
                                    {(() => {
                                        // 这个字母属于的所有品牌
                                        let theBrandsInChar = Object.keys(this.props.allbs[char]);

                                        // 返回数组的映射
                                        return theBrandsInChar.map(brand => <span 
                                                key={brand} 
                                                className={classnames(['brand_a', {
                                                    'cur': nowBrand === brand
                                                }])}
                                                onClick={()=>{
                                                    this.setState({
                                                        realChar: this.state.nowChar
                                                    });

                                                    this.props.dispatch({'type': 'car/changeFilterAsync', 'k': 'brand', 'v': brand, 'kind': 'B'});
                                                }}
                                            >{brand}</span>);
                                    })()}
                                </TabPane>)
                            } 
                        </Tabs>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>车系：</Col>
                    <Col span={21}>
                        {
                            this.state.series.map(theseries => <span 
                                key={theseries} 
                                className={classnames(['brand_a', {
                                    'cur': nowSeries === theseries
                                }])}
                                onClick={()=>{
                                    this.props.dispatch({'type': 'car/changeFilterAsync', 'k': 'series', 'v': theseries, 'kind': 'B'});
                                }}
                            >
                                {theseries}
                            </span>)
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}
export default BsFilter;