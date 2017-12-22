import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/normalize.css/normalize.css';

import './index.css';

ReactDOM.render(React.createElement(App), document.getElementById('root'));

registerServiceWorker();
