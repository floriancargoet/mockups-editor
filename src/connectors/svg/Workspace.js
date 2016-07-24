import { connect } from 'react-redux';
import { updateComponentProperty } from '../../actions/high-level/actions';
import * as UIActions from '../../actions/low-level/UIActions';

import Workspace from '../../components/svg/Workspace.jsx';

const mapStateToProps = (state) => {
  const index = state.present.currentMockup;
  const mockup = state.present.mockups[index];
  const ui = mockup.ui;
  const componentToEditInPlace = mockup.components.find(c => c.id === ui.inPlaceEdit);
  return {
    componentToEditInPlace,
    panZoomMatrix: ui.panZoomMatrix
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInPlacePropertyChange: function (component, property, value) {
      dispatch(updateComponentProperty(component, property, value));
    },

    onPanZoom: function (matrix) {
      dispatch(UIActions.panZoom(matrix));
    },

    onDoubleMiddleClick: function () {
      dispatch(UIActions.resetPanZoom());
    }
  };
};

const ConnectedWorkspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);

export default ConnectedWorkspace;
