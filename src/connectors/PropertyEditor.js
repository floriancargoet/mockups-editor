import { connect } from 'react-redux';
import * as UndoActions from '../actions/UndoActions';
import { updateComponentProperty, updateComponentRootProperty } from '../actions';

import PropertyEditor from '../components/PropertyEditor.jsx';

const mapStateToProps = (state) => {
  const index = state.present.currentMockup;
  const mockup = state.present.mockups[index];
  return {
    component: (mockup.selection.length === 1)
      ? mockup.components.find(c => c.id === mockup.selection[0])
      : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRootPropertyChange(component, prop, value) {
      dispatch(UndoActions.save('Change ' + prop));
      dispatch(updateComponentRootProperty(component.id, prop, value));
    },
    onPropertyChange(component, prop, value) {
      dispatch(UndoActions.save('Change ' + prop));
      dispatch(updateComponentProperty(component.id, prop, value));
    }
  };
};

const ConnectedPropertyEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyEditor);

export default ConnectedPropertyEditor;
