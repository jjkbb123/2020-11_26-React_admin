import React from 'react';
import ReactDOM from 'react-dom';


import memoryUtils from './utils/memoryUtils'
import storeageUtils from './utils/storeageUtils'

import 'antd/dist/antd.less';
import App from './App'

const user = storeageUtils.getStore()
memoryUtils.user = user
ReactDOM.render(<App />,document.getElementById('root'))