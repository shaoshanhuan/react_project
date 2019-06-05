import React, { Component } from 'react';
import { sortable } from 'react-sortable';

 class ChangeColsModal_li extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <li {...this.props}>
                {this.props.item.chinese}
                <b onClick={()=>{
                    this.props.delitem(this.props.item);
                }}>
                    ×
                </b>
            </li>
        );
    }
}
export default sortable(ChangeColsModal_li);