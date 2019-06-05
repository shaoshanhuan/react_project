import React, { Component } from 'react';
import SideBarLayout from '../../layouts/SideBarLayout';
import MyForm from './MyForm';

export default class Selling extends Component {
    render() {
        
        return (
            <SideBarLayout>
                <MyForm />
            </SideBarLayout>
        );
    }
}
