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

import * as components from './mockup-components';

const logger = createLogger({ collapsed: true });

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);


let x = 50, y = 50;
const width = 150, height = 150;
Object.keys(components).forEach(type => {
  store.dispatch(addComponent(components[type].create({
    x, y, width, height
  })));
  x += 200;
  if (x > 1200) {
    y += 200;
    x = 50;
  }
});


const rootComponent = (
  <Provider store={store}>
    <Editor/>
  </Provider>
);

const el = document.getElementById('root');
ReactDOM.render(rootComponent, el);
