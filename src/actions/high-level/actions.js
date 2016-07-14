import * as LLActions from '../low-level/actions';
import * as LLUIActions from '../low-level/UIActions';
import * as UndoActions from '../low-level/UndoActions';


export function createComponent(component) {
  return dispatch => {
    dispatch(UndoActions.save('Create component'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.addComponent(component));
    dispatch(LLActions.selectLastComponent());
  };
};

export function deleteSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Delete selection'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.deleteSelection());
  };
};

export function duplicateSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Duplicate selection'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.duplicateSelection());
  };
};

export function groupSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Group selection'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.groupSelection());
  };
};

export function ungroupSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Ungroup selection'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.ungroupSelection());
  };
};

export function bringUpSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Bring selection up'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.zMoveSelection('up'));
  };
};


export function bringTopSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Bring selection to top'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.zMoveSelection('top'));
  };
};

export function pushDownSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Push selection down'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.zMoveSelection('down'));
  };
};

export function pushBottomSelection() {
  return dispatch => {
    dispatch(UndoActions.save('Push selection to bottom'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.zMoveSelection('bottom'));
  };
};

export function updateComponentRootProperty(component, prop, value) {
  return dispatch => {
    // hide in place editor?
    dispatch(UndoActions.save('Change ' + prop));
    dispatch(LLActions.updateComponentRootProperty(component.id, prop, value));
  };
};

export function updateComponentProperty(component, prop, value) {
  return dispatch => {
    // hide in place editor?
    dispatch(UndoActions.save('Change ' + prop));
    dispatch(LLActions.updateComponentProperty(component.id, prop, value));
  };
};

export function selectMockup(index) {
  return dispatch => {
    dispatch(UndoActions.save('Select mockup'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.selectMockup(index));
  };
};

// use this wrapper to inject a mockupIndex in the action object
function onMockup(mockupIndex, action) {
  return { ...action, mockupIndex };
}

export function renameMockup(index, name) {
  return dispatch => {
    dispatch(UndoActions.save('Rename mockup'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(onMockup(index, LLActions.renameMockup(name)));
  };
};

export function addMockup() {
  return dispatch => {
    dispatch(UndoActions.save('Add mockup'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.addMockup());
    dispatch(LLActions.selectMockup(-1));
  };
};

export function resizeComponent(component, { x, y, width, height }) {
  return dispatch => {
    dispatch(UndoActions.save('Resize component'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.moveComponent(component.id, x, y));
    dispatch(LLActions.resizeComponent(component.id, width, height));
    dispatch(LLActions.selectOneComponent(component.id));
  };
};

export function moveComponent(component, x, y) {
  return dispatch => {
    dispatch(UndoActions.save('Move component'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.moveComponent(component.id, x, y));
    dispatch(LLActions.selectOneComponent(component.id));
  };
};

export function selectComponent(component) {
  return dispatch => {
    dispatch(UndoActions.save('Select component'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.selectOneComponent(component.id));
  };
};

export function addComponentToSelection(component) {
  return dispatch => {
    dispatch(UndoActions.save('Add component to selection'));
    dispatch(LLUIActions.hideInPlaceEditor());
    dispatch(LLActions.selectComponent(component.id));
  };
};

export function clearSelection() {
  return (dispatch, getState) => {
    const state = getState().present;
    const mockup = state.mockups[state.currentMockup];
    if (mockup && mockup.selection.length > 0) {
      dispatch(UndoActions.save('Clear selection'));
      dispatch(LLUIActions.hideInPlaceEditor());
      dispatch(LLActions.clearSelection());
    }
  };
};
