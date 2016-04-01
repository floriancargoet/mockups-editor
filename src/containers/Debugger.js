import { connect } from 'react-redux';

import Debugger from '../components/Debugger.jsx';

const mapStateToProps = (state) => {
  return {
    state: state.present
  };
};


const ConnectedDebugger = connect(
  mapStateToProps,
  null
)(Debugger);

export default ConnectedDebugger;
