import { connect } from 'react-redux';
import * as UndoActions from '../actions/UndoActions';
import {
  addComponent, selectLastComponent, deleteSelection,
  groupSelection, ungroupSelection, zMoveSelection,
  duplicateSelection
} from '../actions';

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
          dispatch(UndoActions.save('Create component'));
          dispatch(addComponent(args[0].create()));
          dispatch(selectLastComponent());
          break;

        case 'delete':
          dispatch(UndoActions.save('Delete component'));
          dispatch(deleteSelection());
          break;

        case 'duplicate':
          dispatch(UndoActions.save('Duplicate component'));
          dispatch(duplicateSelection());
          break;

        case 'group':
          dispatch(UndoActions.save('Group selection'));
          dispatch(groupSelection());
          break;

        case 'ungroup':
          dispatch(UndoActions.save('Ungroup selection'));
          dispatch(ungroupSelection());
          break;

        case 'bring-up':
          dispatch(UndoActions.save('Bring selection up'));
          dispatch(zMoveSelection('up'));
          break;

        case 'bring-to-top':
          dispatch(UndoActions.save('Bring selection to top'));
          dispatch(zMoveSelection('top'));
          break;

        case 'push-down':
          dispatch(UndoActions.save('Push selection down'));
          dispatch(zMoveSelection('down'));
          break;

        case 'push-to-bottom':
          dispatch(UndoActions.save('Push selection to bottom'));
          dispatch(zMoveSelection('bottom'));
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
