import Dva from 'dva';

import route from './route';
import carModel from './models/carModel';
import colSortModel from './models/colSortModel';
import carImageModel from './models/carImageModel';
import xxbbModel from './models/xxbbModel';
// 引入样式表
import './less/layouts.less';

const app = Dva();

app.router(route);
app.model(carModel);
app.model(colSortModel);
app.model(carImageModel);
app.model(xxbbModel);

app.start('#root');