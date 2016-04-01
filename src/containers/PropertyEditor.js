import { connect } from 'react-redux';
import { updateComponentProperty } from '../actions';

import PropertyEditor from '../components/PropertyEditor.jsx';

const mapStateToProps = (state) => {
  return {
    component: (state.present.selection.length === 1)
      ? state.present.components.find(c => c.id === state.present.selection[0])
      : null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPropertyChange(component, prop, value) {
      dispatch(updateComponentProperty(component.id, prop, value));
    }
  };
};

const ConnectedPropertyEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyEditor);

export default ConnectedPropertyEditor;
