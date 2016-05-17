import * as LowLevelActions from '../low-level/actions';
import * as UndoActions from '../low-level/UndoActions';

import getInPlaceProperty from '../../util/getInPlaceProperty';

export function createComponent(component) {
  return dispatch => {
    dispatch(UndoActions.save('Create component'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.addComponent(component));
    dispatch(LowLevelActions.selectLastComponent());
  };
};

export function deleteSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Delete selection'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.deleteSelection());
  };
};

export function duplicateSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Duplicate selection'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.duplicateSelection());
  };
};

export function groupSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Group selection'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.groupSelection());
  };
};

export function ungroupSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Ungroup selection'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.ungroupSelection());
  };
};

export function bringUpSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Bring selection up'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.zMoveSelection('up'));
  };
};


export function bringTopSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Bring selection to top'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.zMoveSelection('top'));
  };
};

export function pushDownSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Push selection down'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.zMoveSelection('down'));
  };
};

export function pushBottomSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Push selection to bottom'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.zMoveSelection('bottom'));
  };
};

export function updateComponentRootProperty(component, prop, value) {
  return dispatch => {
    // hide in place editor?
    dispatch(UndoActions.save('Change ' + prop));
    dispatch(LowLevelActions.updateComponentRootProperty(component.id, prop, value));
  };
};

export function updateComponentProperty(component, prop, value) {
  return dispatch => {
    // hide in place editor?
    dispatch(UndoActions.save('Change ' + prop));
    dispatch(LowLevelActions.updateComponentProperty(component.id, prop, value));
  };
};

export function selectMockup(index) {
  return dispatch => {
    dispatch(UndoActions.save('Select mockup'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.selectMockup(index));
  };
};

// use this wrapper to inject a mockupIndex in the action object
function onMockup(mockupIndex, action) {
  return { ...action, mockupIndex };
}

export function renameMockup(index, name) {
  return dispatch => {
    dispatch(UndoActions.save('Rename mockup'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(onMockup(index, LowLevelActions.renameMockup(name)));
  };
};

export function addMockup() {
  return dispatch => {
    dispatch(UndoActions.save('Add mockup'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.addMockup());
    dispatch(LowLevelActions.selectMockup(-1));
  };
};

export function resizeComponent(component, { x, y, width, height }) {
  return dispatch => {
    dispatch(UndoActions.save('Resize component'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.moveComponent(component.id, x, y));
    dispatch(LowLevelActions.resizeComponent(component.id, width, height));
    dispatch(LowLevelActions.selectOneComponent(component.id));
  };
};

export function moveComponent(component, x, y) {
  return dispatch => {
    dispatch(UndoActions.save('Move component'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.moveComponent(component.id, x, y));
    dispatch(LowLevelActions.selectOneComponent(component.id));
  };
};

export function selectComponent(component) {
  return dispatch => {
    dispatch(UndoActions.save('Select component'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.selectOneComponent(component.id));
  };
};

export function addComponentToSelection(component) {
  return dispatch => {
    dispatch(UndoActions.save('Add component to selection'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.selectComponent(component.id));
  };
};

export function showInPlaceEditor(component) {
  return dispatch => {
    // showing the editor is not something we want in the history
    const property = getInPlaceProperty(component.type);
    if (property) {
      dispatch(LowLevelActions.showInPlaceEditor(component.id));
    }
  };
};

export function clearSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Clear selection'));
    dispatch(LowLevelActions.hideInPlaceEditor());
    dispatch(LowLevelActions.clearSelection());
  };
};
