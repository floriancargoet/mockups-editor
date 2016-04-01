import React from 'react';
import ReactDOM from 'react-dom';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import CustomDragLayer from './CustomDragLayer.jsx';

import ComponentsContainer from '../containers/ComponentsContainer';

class Workspace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  render() {
    return (
      <svg
        height="100%"
        width="100%"
      >
        <ComponentsContainer width={this.state.width} height={this.state.height} />
        <CustomDragLayer />
      </svg>
    );
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    const el = ReactDOM.findDOMNode(this);
    this.setState({
      width: el.clientWidth,
      height: el.clientHeight
    });
  }
}


const DDCDecorator = DragDropContext(TouchBackend({ enableMouseEvents: true }));

export default DDCDecorator((Workspace));
