import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';
import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App from './components/app';
import configureStore from './store';

const accessToken = storage.get('auth');
configureClient({ accessToken });
const store = configureStore({auth: !!accessToken});



ReactDOM.render(
  <React.StrictMode>
    <Root store={store}>
    <App/>
    </Root>
  </React.StrictMode>,
  document.getElementById('root')
);
