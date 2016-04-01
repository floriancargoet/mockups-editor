import { connect } from 'react-redux';
import { selectLastComponent, addComponent } from '../actions';
import random from 'random-number-in-range';

import Editor from '../components/Editor.jsx';

const mapDispatchToProps = (dispatch) => {
  return {
    onNewBoxClicked: () => {
      dispatch(addComponent({
        type: 'Box',
        x: random(50, 500),
        y: random(50, 500),
        width: random(50, 200),
        height: random(50, 200)
      }));
      dispatch(selectLastComponent());
    }
  };
};

const ConnectedEditor = connect(
  null,
  mapDispatchToProps
)(Editor);

export default ConnectedEditor;
