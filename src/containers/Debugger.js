import { connect } from 'react-redux';

import Debugger from '../components/Debugger.jsx';

const mapStateToProps = (state) => {
  const index = state.present.currentMockup;
  const mockup = state.present.mockups[index];
  return {
    state: mockup
  };
};


const ConnectedDebugger = connect(
  mapStateToProps,
  null
)(Debugger);

export default ConnectedDebugger;
