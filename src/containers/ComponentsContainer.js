import { connect } from 'react-redux';
import {
  resizeComponent, moveComponent,
  selectOneComponent, selectComponent,
  clearSelection
} from '../actions';

import ComponentsContainer from '../components/ComponentsContainer.jsx';

const mapStateToProps = (state) => {
  return {
    components: state.present.components,
    selection: state.present.selection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentResized: (id, { x, y, width, height }) => {
      dispatch(moveComponent(id, x, y));
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
    onComponentsContainerClicked: () => {
      dispatch(clearSelection());
    }
  };
};

const ConnectedComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsContainer);

export default ConnectedComponentsContainer;
