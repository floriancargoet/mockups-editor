import { connect } from 'react-redux';
import {
  resizeComponent, moveComponent,
  addComponentToSelection, selectComponent,
  clearSelection
} from '../../actions/high-level/actions';
import * as UIActions from '../../actions/high-level/UIActions';

import ComponentsContainer from '../../components/svg/ComponentsContainer.jsx';

const mapStateToProps = (state) => {
  const index = state.present.currentMockup;
  const mockup = state.present.mockups[index];

  return {
    components: mockup.components,
    selection: mockup.selection
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

    onComponentResized: (component, sizeInfo) => {
      dispatch(resizeComponent(component, sizeInfo));
    },

    onComponentMoved: (component, x, y) => {
      dispatch(moveComponent(component, x, y));
    },

    onComponentMouseDown: (component, ev) => {
      if (ev.ctrlKey) {
        dispatch(addComponentToSelection(component));
      }
      else {
        dispatch(selectComponent(component));
      }
    },

    onComponentDoubleClick: (component, ev) => {
      dispatch(UIActions.showInPlaceEditor(component));
    },

    onBackgroundClicked: () => {
      dispatch(clearSelection());
    }

  };
};

const ConnectedComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsContainer);

export default ConnectedComponentsContainer;
