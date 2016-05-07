import { connect } from 'react-redux';
import * as UndoActions from '../actions/UndoActions';
import {
  onMockup,
  selectMockup, renameMockup, addMockup
} from '../actions';

import MockupSelector from '../components/MockupSelector.jsx';

const mapStateToProps = (state) => {
  return state.present;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMockupClicked: (index) => {
      dispatch(UndoActions.save('Select mockup'));
      dispatch(selectMockup(index));
    },
    onMockupNameClicked: (index) => {
      dispatch(UndoActions.save('Rename mockup'));
      const name = prompt('New name');
      dispatch(onMockup(index, renameMockup(name)));
    },
    onAddClicked: () => {
      dispatch(UndoActions.save('Add mockup'));
      dispatch(addMockup());
      dispatch(selectMockup(-1));
    }
  };
};

const ConnectedMockupSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(MockupSelector);

export default ConnectedMockupSelector;
