import getID from './util/id';
// TODO FSA? https://github.com/acdlite/flux-standard-action

export const MOVE_COMPONENT = 'MOVE_COMPONENT';
export const RESIZE_COMPONENT = 'RESIZE_COMPONENT';
export const ADD_COMPONENT = 'ADD_COMPONENT';
export const UPDATE_COMPONENT_PROPERTY = 'UPDATE_COMPONENT_PROPERTY';
export const UPDATE_COMPONENT_ROOT_PROPERTY = 'UPDATE_COMPONENT_ROOT_PROPERTY';

export const SELECT_COMPONENT = 'SELECT_COMPONENT';
export const SELECT_ONE_COMPONENT = 'SELECT_ONE_COMPONENT';
export const SELECT_LAST_COMPONENT = 'SELECT_LAST_COMPONENT';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const DELETE_SELECTION = 'DELETE_SELECTION';
export const GROUP_SELECTION = 'GROUP_SELECTION';
export const UNGROUP_SELECTION = 'UNGROUP_SELECTION';
export const Z_MOVE_SELECTION = 'Z_MOVE_SELECTION';
export const DUPLICATE_SELECTION = 'DUPLICATE_SELECTION';

export const ADD_MOCKUP = 'ADD_MOCKUP';
export const SELECT_MOCKUP = 'SELECT_MOCKUP';
export const RENAME_MOCKUP = 'RENAME_MOCKUP';


export function moveComponent(id, x, y) {
  return { type: MOVE_COMPONENT, id, x, y };
}

export function resizeComponent(id, width, height) {
  return { type: RESIZE_COMPONENT, id, width, height };
}

export function addComponent(component) {
  return { type: ADD_COMPONENT, component: { id: getID(), ...component } };
}


export function selectComponent(id) {
  return { type: SELECT_COMPONENT, id };
}

export function selectOneComponent(id) {
  return { type: SELECT_ONE_COMPONENT, id };
}

export function selectLastComponent() {
  return { type: SELECT_LAST_COMPONENT };
}


export function clearSelection() {
  return { type: CLEAR_SELECTION };
}

export function deleteSelection() {
  return { type: DELETE_SELECTION };
}

export function groupSelection() {
  return function groupSelectionThunk(dispatch, getState) { // useless, just a test
    return dispatch({ type: GROUP_SELECTION, groupId: getID() });
  };
}

export function ungroupSelection() {
  return { type: UNGROUP_SELECTION };
}

export function zMoveSelection(where) {
  return { type: Z_MOVE_SELECTION, where };
}

export function updateComponentProperty(id, property, value) {
  return { type: UPDATE_COMPONENT_PROPERTY, id, property, value };
}
export function updateComponentRootProperty(id, property, value) {
  return { type: UPDATE_COMPONENT_ROOT_PROPERTY, id, property, value };
}

export function duplicateSelection() {
  return { type: DUPLICATE_SELECTION };
}

export function addMockup() {
  return { type: ADD_MOCKUP };
}

export function selectMockup(index) {
  return { type: SELECT_MOCKUP, index };
}

export function renameMockup(name) {
  // current mockup
  return { type: RENAME_MOCKUP, name };
}
