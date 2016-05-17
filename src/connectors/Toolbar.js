import { connect } from 'react-redux';
import * as UndoActions from '../actions/low-level/UndoActions';

import {
  createComponent,
  deleteSelection, duplicateSelection,
  groupSelection, ungroupSelection,
  bringUpSelection, bringTopSelection,
  pushDownSelection, pushBottomSelection
} from '../actions/high-level/actions';

import Toolbar from '../components/Toolbar.jsx';

const mapStateToProps = (state) => {
  const index = state.present.currentMockup;
  const mockup = state.present.mockups[index];
  const selectedComponents = mockup.components.filter(c => mockup.selection.includes(c.id));
  const lastPastActions = state.past.slice(-10).reverse()
    .map((s, i) => ({ name: s.undoableActionName, index: i }));
  // state action name are shifted for the future states
  let prev = state.present;
  const nextFutureActions = state.future.slice(0, 10)
    .map((s, i) => {
      const action = { name: prev.undoableActionName, index: i };
      prev = s;
      return action;
    });

  return {
    // Undo
    undoableActions: lastPastActions,
    redoableActions: nextFutureActions,
    // Selection
    selection: mockup.selection,
    selectionContainsGroup: (selectedComponents.filter(c => c.type === '__Group__').length > 0)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClicked: (type, ...args) => {
      switch (type) {
        case 'undo':
          dispatch(UndoActions.undo());
          break;

        case 'undo-jump':
          dispatch(UndoActions.jump(-(args[0] + 1)));
          break;

        case 'redo':
          dispatch(UndoActions.redo());
          break;

        case 'redo-jump':
          dispatch(UndoActions.jump(args[0] + 1));
          break;


        case 'create':
          dispatch(createComponent(args[0].create()));
          break;

        case 'delete':
          dispatch(deleteSelection());
          break;

        case 'duplicate':
          dispatch(duplicateSelection());
          break;

        case 'group':
          dispatch(groupSelection());
          break;

        case 'ungroup':
          dispatch(ungroupSelection());
          break;

        case 'bring-up':
          dispatch(bringUpSelection());
          break;

        case 'bring-to-top':
          dispatch(bringTopSelection());
          break;

        case 'push-down':
          dispatch(pushDownSelection());
          break;

        case 'push-to-bottom':
          dispatch(pushBottomSelection());
          break;
      }
    }
  };
};

const ConnectedToolbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);

export default ConnectedToolbar;
