/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers/anecdoteReducer';

const store = createStore(reducer);

store.subscribe(() => {
  const storeNow = store.getState();
  storeNow.sort((a, b) => b.votes - a.votes);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

renderApp();
store.subscribe(renderApp);
