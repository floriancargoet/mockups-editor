import 'babel-polyfill';
// React
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

// App
import { addComponent } from './actions';
import rootReducer from './reducers';
// UI Root
import Editor from './containers/Editor';

import * as components from './mockup-components/all';

const logger = createLogger({ collapsed: true });

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

store.dispatch(addComponent(components.Box.create({
  width: 100,
  height: 100,
  x: 50,
  y: 50,
  properties: {
    text: 'b1',
    backgroundColor: 'pink'
  }
})));

store.dispatch(addComponent(components.Box.create({
  width: 150,
  height: 100,
  x: 90,
  y: 60,
  properties: {
    text: 'b2'
  }
})));

store.dispatch(addComponent(components.Title.create({
  width: 150,
  height: 50,
  x: 190,
  y: 160,
  properties: {
    text: 'Hello mockup'
  }
})));

store.dispatch(addComponent(components.Button.create({
  width: 80,
  height: 40,
  x: 350,
  y: 350,
  properties: {
    backgroundColor: 'lime'
  }
})));

store.dispatch(addComponent(components.ButtonBar.create({
  width: 300,
  height: 50,
  x: 150,
  y: 450,
  properties: {
    text: 'Button 1, Press me, Hello world'
  }
})));


const rootComponent = (
  <Provider store={store}>
    <Editor/>
  </Provider>
);

const el = document.getElementById('root');
ReactDOM.render(rootComponent, el);
