import { connect } from 'react-redux';
import {
  selectMockup, renameMockup
} from '../actions';

import MockupSelector from '../components/MockupSelector.jsx';

const mapStateToProps = (state) => {
  return state.present;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMockupClicked: (index) => {
      dispatch(selectMockup(index));
    },
    onMockupDoubleClicked: (index) => {
      dispatch(selectMockup(index));
      const name = prompt('New name');
      dispatch(renameMockup(name));
    }
  };
};

const ConnectedMockupSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(MockupSelector);

export default ConnectedMockupSelector;
