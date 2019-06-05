import React from 'react';
import {Router, Route, Redirect, Switch} from 'dva/router';

import Index from './pages/index/Index';
import Selling from './pages/selling/Selling';
import Buy from './pages/buy/Buy';
import Auction from './pages/auction/Auction';
import Orderquery from './pages/orderquery/Orderquery';
import Specialorder from './pages/specialorder/Specialorder';
import Allinsurance from './pages/allinsurance/Allinsurance';
import Allssss from './pages/allssss/Allssss';

export default ({history}) => <Router history={history}>
    <div>
        <Switch>
            <Route path="/index/index" exact component={Index} />
            <Route path="/transaction/selling" exact component={Selling} />
            <Route path="/transaction/buy" exact component={Buy} />
            <Route path="/transaction/auction" exact component={Auction} />
            <Route path="/order/orderquery" exact component={Orderquery} />
            <Route path="/order/specialorder" exact component={Specialorder} />
            <Route path="/insurance/allinsurance" exact component={Allinsurance} />
            <Route path="/ssss/Allssss" exact component={Allssss} />
            <Redirect strict to="/index/index" exact />
        </Switch>
    </div>
</Router>;