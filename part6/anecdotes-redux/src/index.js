/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

renderApp();
