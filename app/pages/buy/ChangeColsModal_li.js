import React, { Component } from 'react';
import { sortable } from 'react-sortable';

 class ChangeColsModal_li extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <li {...this.props}>
                {this.props.info.item.chinese}
                <b onClick={()=>{
                    this.props.info.delitem(this.props.info.item.k);
                }}>
                    ×
                </b>
            </li>
        );
    }
}
export default sortable(ChangeColsModal_li);