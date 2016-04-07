import { connect } from 'react-redux';
import { ActionCreators as UndoActions } from 'redux-undo';
import {
  addComponent, selectLastComponent, deleteSelection,
  groupSelection, ungroupSelection, zMoveSelection,
  duplicateSelection
} from '../actions';
import random from 'random-number-in-range';

import Toolbar from '../components/Toolbar.jsx';

const mapStateToProps = (state) => {
  const selectedComponents = state.present.components.filter(c => state.present.selection.includes(c.id));
  return {
    components: state.present.components,
    selection: state.present.selection,
    selectionContainsGroup: (selectedComponents.filter(c => c.type === '__Group__').length > 0)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonClicked: (type) => {
      switch (type) {
        case 'undo':
          dispatch(UndoActions.undo());
          break;

        case 'redo':
          dispatch(UndoActions.redo());
          break;

        case 'createBox':
          dispatch(addComponent({
            type: 'Box',
            x: random(50, 500),
            y: random(50, 500),
            width: random(50, 200),
            height: random(50, 200)
          }));
          dispatch(selectLastComponent());
          break;

        case 'createButton':
          dispatch(addComponent({
            type: 'Button',
            text: 'click me',
            x: random(50, 500),
            y: random(50, 500),
            width: random(50, 200),
            height: random(50, 200)
          }));
          dispatch(selectLastComponent());
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
          dispatch(zMoveSelection('up'));
          break;

        case 'bring-to-top':
          dispatch(zMoveSelection('top'));
          break;

        case 'push-down':
          dispatch(zMoveSelection('down'));
          break;

        case 'push-to-bottom':
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
