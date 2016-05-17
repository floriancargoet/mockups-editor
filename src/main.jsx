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
import * as UndoActions from './actions/low-level/UndoActions';
import { addComponent, selectMockup, renameMockup } from './actions/low-level/actions';
import rootReducer from './reducers';
// UI Root
import Editor from './components/Editor.jsx';

import * as components from './mockup-components';

const logger = createLogger({ collapsed: true });

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

store.dispatch(selectMockup(0));
store.dispatch(renameMockup('Mockup #1'));


store.dispatch(UndoActions.save('Add examples'));
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

/*
store.dispatch(addMockup());
store.dispatch(selectMockup(1));
store.dispatch(renameMockup('Mockup #2'));
store.dispatch(addComponent(components.Title.create({
  x: 0, y: 0, width: 200,
  properties: {
    text: 'Mockup #2'
  }
})));
*/


const rootComponent = (
  <Provider store={store}>
    <Editor/>
  </Provider>
);

const el = document.getElementById('root');
ReactDOM.render(rootComponent, el);
