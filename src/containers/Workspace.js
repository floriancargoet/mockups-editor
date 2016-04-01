import { connect } from 'react-redux';
import {
  resizeComponent, moveComponent,
  selectOneComponent, selectComponent,
  clearSelection
} from '../actions';

import Workspace from '../components/Workspace.jsx';

const mapStateToProps = (state) => {
  return {
    components: state.present.components,
    selection: state.present.selection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentResized: (id, width, height) => {
      dispatch(resizeComponent(id, width, height));
      dispatch(selectOneComponent(id));
    },
    onComponentMoved: (id, x, y) => {
      dispatch(moveComponent(id, x, y));
      dispatch(selectOneComponent(id));
    },
    onComponentClicked: (id, ev) => {
      if (ev.ctrlKey) {
        dispatch(selectComponent(id));
      }
      else {
        dispatch(selectOneComponent(id));
      }
    },
    onWorkspaceClicked: () => {
      dispatch(clearSelection());
    }
  };
};

const ConnectedWorkspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);

export default ConnectedWorkspace;
