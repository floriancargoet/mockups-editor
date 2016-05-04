import { connect } from 'react-redux';
import {
  selectMockup
} from '../actions';

import MockupSelector from '../components/MockupSelector.jsx';

const mapStateToProps = (state) => {
  return state.present;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMockupClicked: (index) => {
      dispatch(selectMockup(index));
    }
  };
};

const ConnectedMockupSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(MockupSelector);

export default ConnectedMockupSelector;
