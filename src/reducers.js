import update from 'react/lib/update';
import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import * as utils from './reducers-utils';
import getID from './util/id';
import * as mockupComponents from './mockup-components';

import * as UndoActions from './actions/low-level/UndoActions';

import {
  MOVE_COMPONENT, RESIZE_COMPONENT, ADD_COMPONENT, UPDATE_COMPONENT_PROPERTY,
  UPDATE_COMPONENT_ROOT_PROPERTY,
  SELECT_COMPONENT, SELECT_ONE_COMPONENT, SELECT_LAST_COMPONENT,
  CLEAR_SELECTION, DELETE_SELECTION, GROUP_SELECTION, UNGROUP_SELECTION,
  Z_MOVE_SELECTION, DUPLICATE_SELECTION,

  ADD_MOCKUP, SELECT_MOCKUP, RENAME_MOCKUP
} from './actions/low-level/actions';

import { UI_PANZOOM, UI_PANZOOM_RESET, UI_SET_IN_PLACE_EDITOR } from './actions/low-level/UIActions';


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

function callPropertyUpdater(component, property, value) {
  const Component = mockupComponents[component.type];
  if (typeof Component.updateProperty === 'function') {
    return Component.updateProperty(component, property, value);
  }
  return component;
}

function callRootPropertyUpdater(component, property, value) {
  const Component = mockupComponents[component.type];
  if (typeof Component.updateRootProperty === 'function') {
    return Component.updateRootProperty(component, property, value);
  }
  return component;
}


/*
{
  currentMockup: index,
  mockups: [{
    name: "",
    ui: {
      inPlaceEdit: id,
      panZoomMatrix: [1, 0, 0, 1, 0, 0]
    },
    components: [component...],
    last: id,
    selection: [id, ...]
  }]
}
*/

function name(state = 'Untitled', action) {
  switch (action.type) {
    case RENAME_MOCKUP:
      return action.name;
    default:
      return state;
  }
}

function ui(state, action) {
  if (!state) {
    state = {
      inPlaceEdit: null,
      panZoomMatrix: [1, 0, 0, 1, 0, 0]
    };
  }
  switch (action.type) {
    case UI_SET_IN_PLACE_EDITOR: {
      return { ...state, inPlaceEdit: action.id };
    }
    case UI_PANZOOM: {
      return { ...state, panZoomMatrix: action.matrix };
    }
    case UI_PANZOOM_RESET: {
      return { ...state, panZoomMatrix: [1, 0, 0, 1, 0, 0]};
    }
    default:
      return state;
  }

}

function components(state = [], action) {
  const index = state.findIndex(c => c.id === action.id);

  switch (action.type) {

    case MOVE_COMPONENT: {
      if (state[index].type === '__Group__') {
        // update children instead of group
        return update(state, {
          [index]: {
            $apply: function (group) {
              return cascadeUpdateChildren(group, c => {
                return c.type === '__Group__' ? c : {
                  ...c,
                  x: c.x + action.x,
                  y: c.y + action.y
                };
              });
            }
          }
        });
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
      state = update(state, {
        [index]: {
          properties: {
            $merge: {
              [action.property]: action.value
            }
          }
        }
      });
      return update(state, {
        [index]: {
          $apply: c => callPropertyUpdater(c, action.property, action.value)
        }
      });
    }

    case UPDATE_COMPONENT_ROOT_PROPERTY: {
      state = update(state, {
        [index]: {
          $merge: {
            [action.property]: action.value
          }
        }
      });
      return update(state, {
        [index]: {
          $apply: c => callRootPropertyUpdater(c, action.property, action.value)
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

function last(state = null, action) {
  return state;
}

/*
 * Actions on multiple parts of the state tree *
 */
function fullMockup(state = {}, action) {
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
          $push: [action.component]
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
        // TODO group component?
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        locked: false,
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


const combinedMockup = combineReducers({
  name,
  ui,
  components,
  selection,
  last
});

function mockup(state, action) {
  return fullMockup(combinedMockup(state, action), action);
}


function currentMockup(state = 0, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function mockups(state = [], action) {

  switch (action.type) {
    case ADD_MOCKUP:
      return [...state, mockup(undefined, action)];
    default:
      return state;
  }
}


function rootReducer(state, action) {

  // Initial root state
  if (!state) {
    state = {
      undoableActionName: '',
      currentMockup: 0, // use 0 as initial index to create a empty mockup
      mockups: []
    };
  }

  // Root props reducers
  state = {
    undoableActionName: state.undoableActionName,
    currentMockup: currentMockup(state.currentMockup, action),
    mockups: mockups(state.mockups, action)
  };

  // Top-level reducer (needs to access all root props)
  switch (action.type) {
    case SELECT_MOCKUP: {
      let index = action.index;
      // negative indices
      if (index < 0) {
        index += state.mockups.length;
      }
      state = update(state, {
        currentMockup: {
          $set: index
        }
      });
      break;
    }

    case UndoActions.NAME_STATE: {
      state = update(state, {
        undoableActionName: {
          $set: action.name
        }
      });
      break;
    }
  }

  // delegate to the mockup reducer, for the specified or current mockup
  const mockupIndex = 'mockupIndex' in action ? action.mockupIndex : state.currentMockup;
  return update(state, {
    mockups: {
      [mockupIndex]: {
        $apply: m => mockup(m, action)
      }
    }
  });
}

export default undoable(rootReducer, {
  limit: 100,
  filter: includeAction(UndoActions.SAVE),
  undoType: UndoActions.UNDO,
  redoType: UndoActions.REDO,
  jumpType: UndoActions.JUMP
});
