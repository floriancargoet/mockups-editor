import { connect } from 'react-redux';

import CustomDragLayer from '../../../components/svg/dnd/CustomDragLayer.jsx';

const mapStateToProps = (state) => {
  const index = state.present.currentMockup;
  const mockup = state.present.mockups[index];
  return {
    components: mockup.components
  };
};


const ConnectedCustomDragLayer = connect(
  mapStateToProps
)(CustomDragLayer);

export default ConnectedCustomDragLayer;
