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
    panX: ui.panX,
    panY: ui.panY,
    zoomMatrix: ui.zoomMatrix
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInPlacePropertyChange: function (component, property, value) {
      dispatch(updateComponentProperty(component, property, value));
    },

    onPan: function (x, y) {
      dispatch(UIActions.pan(x, y));
    },

    onZoom: function (matrix) {
      dispatch(UIActions.zoom(matrix));
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
