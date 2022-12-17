import log from 'loglevel';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import { App } from './app';
import './components/shared/theme/theme.scss';
import config from './config';
import './index.scss';
import { configureStore } from './redux/store';
import { AppRouter } from './routes';
// import * as serviceWorker from './serviceWorker';

log.debug('init react app'); // example log

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
     <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
