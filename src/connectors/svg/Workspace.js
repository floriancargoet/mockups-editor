import { connect } from 'react-redux';
import { updateComponentProperty } from '../../actions/high-level/actions';
import Workspace from '../../components/svg/Workspace.jsx';

const mapStateToProps = (state) => {
  const index = state.present.currentMockup;
  const mockup = state.present.mockups[index];
  const componentToEditInPlace = mockup.components.find(c => c.id === mockup.inPlaceEdit);
  return {
    componentToEditInPlace
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInPlacePropertyChange: function (component, property, value) {
      dispatch(updateComponentProperty(component, property, value));
    }
  };
};

const ConnectedWorkspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);

export default ConnectedWorkspace;
