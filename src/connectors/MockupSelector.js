import { connect } from 'react-redux';
import {
  selectMockup, renameMockup, addMockup
} from '../actions/high-level/actions';

import MockupSelector from '../components/MockupSelector.jsx';

const mapStateToProps = (state) => {
  return state.present;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMockupClicked: (index) => {
      dispatch(selectMockup(index));
    },
    onMockupNameClicked: (index) => {
      const name = prompt('New name');
      dispatch(renameMockup(index, name));
    },
    onAddClicked: () => {
      dispatch(addMockup());
    }
  };
};

const ConnectedMockupSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(MockupSelector);

export default ConnectedMockupSelector;
