import update from 'react/lib/update';
import { combineReducers } from 'redux';
import undoable from 'redux-undo';
import * as utils from './reducers-utils';
import getID from './util/id';

import {
  MOVE_COMPONENT, RESIZE_COMPONENT, ADD_COMPONENT, UPDATE_COMPONENT_PROPERTY,
  SELECT_COMPONENT, SELECT_ONE_COMPONENT, SELECT_LAST_COMPONENT,
  CLEAR_SELECTION, DELETE_SELECTION, GROUP_SELECTION, UNGROUP_SELECTION,
  Z_MOVE_SELECTION, DUPLICATE_SELECTION
} from './actions';

const defaultComponent = { // TODO: move to action creator?
  x: 0, y: 0,
  width: 100, height: 100,
  properties: {
    text: '',
    backgroundColor: '#ccc'
  }
};

function cascadeUpdateChildren(item, cb) {
  return update(item, {
    children: {
      $apply: function (children) {
        if (!children) {
          return children;
        }
        return children.map(c => {
          if (c.children) {
            c = cascadeUpdateChildren(c, cb);
          }
          return cb(c);
        });
      }
    }
  });
}

function cascadeUpdate(item, cb) {
  return update(item, {
    $apply: cb,
    children: {
      $apply: function (children) {
        if (!children) {
          return children;
        }
        return children.map(c => cascadeUpdate(c, cb));
      }
    }
  });
}

/*
{
  components: [component...],
  last: id,
  selection: [id, ...]
}
*/
function components(state = [], action) {
  const index = state.findIndex(c => c.id === action.id);

  switch (action.type) {

    case MOVE_COMPONENT: {
      if (state[index].type === '__Group__') {
        // update children instead of group
        return state.map(item => cascadeUpdateChildren(item, c => {
          return c.type === '__Group__' ? c : {
            ...c,
            x: c.x + action.x,
            y: c.y + action.y
          };
        }));
      }
      return update(state, {
        [index]: {
          $merge: {
            x: action.x,
            y: action.y
          }
        }
      });
    }

    case RESIZE_COMPONENT: {
      return update(state, {
        [index]: {
          $merge: {
            width: action.width,
            height: action.height
          }
        }
      });
    }

    case UPDATE_COMPONENT_PROPERTY: {
      return update(state, {
        [index]: {
          properties: {
            $merge: {
              [action.property]: action.value
            }
          }
        }
      });
    }

    default:
      return state;
  }
}


function selection(state = [], action) {
  // create a new state only if the state is not reusable
  // it's better for undo/redo
  switch (action.type) {

    case SELECT_COMPONENT:
      return state.includes(action.id) ? state : [...state, action.id];

    case SELECT_ONE_COMPONENT:
      return state.includes(action.id) && state.length === 1 ? state : [action.id];

    case CLEAR_SELECTION:
      return state.length === 0 ? state : [];

    default:
      return state;
  }
}

/*
 * Actions on multiple parts of the state tree *
 */
function fullState(state = {}, action) {
  switch (action.type) {

    case ADD_COMPONENT: {
      if (action.component.type === '__Group__') {
        console.warn('Do not ADD_COMPONENT a group, use GROUP_SELECTION.');
        return state;
      }
      return update(state, {
        last: {
          $set: action.component.id
        },
        components: {
          $push: [{
            ...defaultComponent,
            ...action.component
          }]
        }
      });
    }

    case SELECT_LAST_COMPONENT: {
      return utils.selectLast(state);
    }

    case DELETE_SELECTION: {
      return update(state, {
        components: {
          $set: utils.getUnselectedComponents(state)
        },
        selection: {
          $set: []
        }
      });
    }

    case DUPLICATE_SELECTION: {
      const selection = [];
      const components = [];
      state.components.forEach(component => {
        components.push(component);
        if (state.selection.includes(component.id)) {
          let clone = JSON.parse(JSON.stringify(component));
          // update ids, including inside groups
          clone = cascadeUpdate(clone, c => {
            const newC = {
              ...c,
              id: getID()
            };
            if (c.type !== '__Group__') {
              newC.x = c.x + 30;
              newC.y = c.y + 30;
            }
            return newC;
          });
          components.push(clone);
          selection.push(clone.id);
        }
      });
      return update(state, {
        components: {
          $set: components
        },
        selection: {
          $set: selection
        }
      });
    }

    case UNGROUP_SELECTION: {
      const selectedComponents = utils.getSelectedComponents(state);
      const components = [];
      const selection = [];
      state.components.forEach(c => {
        if (selectedComponents.includes(c)) {
          if (c.type === '__Group__') {
            components.push(...c.children);
            selection.push(...c.children.map(child => child.id));
          }
          else {
            components.push(c);
            selection.push(c.id);
          }
        }
        else {
          components.push(c);
        }
      });

      state = update(state, {
        components: {
          $set: components
        }
      });
      // select all ungrouped
      return update(state, {
        selection: {
          $set: selection
        }
      });
    }

    case GROUP_SELECTION: {
      const group = {
        id: action.groupId,
        type: '__Group__',
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        properties: {},
        children: utils.getSelectedComponents(state)
      };
      const topChild = group.children[group.children.length - 1];
      const components = [];
      state.components.forEach(c => {
        if (!group.children.includes(c)) {
          components.push(c);
        }
        if (c === topChild) {
          components.push(group);
        }
      });

      return update(state, {
        components: {
          $set: components
        },
        selection: {
          $set: [group.id]
        }
      });
    }

    case Z_MOVE_SELECTION: {
      const selectedComponents = utils.getSelectedComponents(state);
      let index;
      switch (action.where) {
        case 'up': {
          index = state.components.findIndex(c => c.id === selectedComponents[selectedComponents.length - 1].id);
          index++;
          selectedComponents.reverse();
          break;
        }
        case 'down': {
          index = state.components.findIndex(c => c.id === selectedComponents[0].id);
          index--;
          break;
        }
        case 'top': {
          index = Infinity;
          selectedComponents.reverse();
          break;
        }
        case 'bottom': {
          index = 0;
          break;
        }
      }
      index = Math.min(Math.max(0, index), state.components.length - 1);
      return update(state, {
        components: {
          $set: utils.moveToIndex(state.components, selectedComponents, index)
        }
      });
    }

    default:
      return state;
  }
}

function last(state = null, action) {
  return state;
}


const combined = combineReducers({
  components,
  selection,
  last
});

function rootReducer(state, action) {
  return fullState(combined(state, action), action);
}

export default undoable(rootReducer, {
  limit: 100
});
