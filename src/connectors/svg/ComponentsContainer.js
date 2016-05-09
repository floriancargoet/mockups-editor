import { connect } from 'react-redux';
import * as UndoActions from '../../actions/UndoActions';
import {
  resizeComponent, moveComponent,
  selectOneComponent, selectComponent,
  clearSelection
} from '../../actions';

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
    onComponentResized: (id, { x, y, width, height }) => {
      dispatch(UndoActions.save('Resize component'));
      dispatch(moveComponent(id, x, y));
      dispatch(resizeComponent(id, width, height));
      dispatch(selectOneComponent(id));
    },
    onComponentMoved: (id, x, y) => {
      dispatch(UndoActions.save('Move component'));
      dispatch(moveComponent(id, x, y));
      dispatch(selectOneComponent(id));
    },
    onComponentMouseDown: (id, ev) => {
      if (ev.ctrlKey) {
        dispatch(UndoActions.save('Add component to selection'));
        dispatch(selectComponent(id));
      }
      else {
        dispatch(UndoActions.save('Select component'));
        dispatch(selectOneComponent(id));
      }
    },
    onBackgroundClicked: () => {
      dispatch(UndoActions.save('Clear selection'));
      dispatch(clearSelection());
    }
  };
};

const ConnectedComponentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentsContainer);

export default ConnectedComponentsContainer;
