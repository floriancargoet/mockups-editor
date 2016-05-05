import React from 'react';
import ReactDOM from 'react-dom';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import CustomDragLayer from '../../containers/svg/dnd/CustomDragLayer';
import PanZoom from './PanZoom.jsx';

import ComponentsContainer from '../../containers/svg/ComponentsContainer';


class Workspace extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      zoomFactor: 1
    };
  }

  render() {
    const { width, height, zoomFactor } = this.state;
    return (
      <svg height="100%" width="100%">
        <PanZoom zoomSpeed={0.2} panHandle=".background" onZoom={this.onZoom}>
          <ComponentsContainer width={width} height={height} zoomFactor={zoomFactor} />
          <CustomDragLayer zoomFactor={zoomFactor} />
        </PanZoom>
      </svg>
    );
  }

  onZoom = ({ zoomFactor }) => {
    this.setState({
      zoomFactor: zoomFactor
    });
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
