import React from 'react';
import ReactDOM from 'react-dom';
import Root from './base/base';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Root />
  , document.getElementById('root')
);
registerServiceWorker();
