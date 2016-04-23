import React from 'react';
import ReactDOM from 'react-dom';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import CustomDragLayer from './dnd/CustomDragLayer.jsx';
import Zoomable from './Zoomable.jsx';

import ComponentsContainer from '../containers/ComponentsContainer';


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
        <defs>
          <filter id="pencil" filterUnits="userSpaceOnUse" x="0" y="0" height="100%" width="100%">
            {/*<feTurbulence baseFrequency="0.9" numOctaves="3" type="fractalNoise"></feTurbulence>*/}
            {/*<feDisplacementMap scale="3" xChannelSelector="R" in="SourceGraphic"></feDisplacementMap>*/}
            <feTurbulence baseFrequency="0.1" numOctaves="3" type="fractalNoise" />
            <feDisplacementMap  scale="6"  xChannelSelector="R" in="SourceGraphic" />
          </filter>
        </defs>
        <Zoomable speed={0.2} handle=".background" onZoom={this.onZoom}>
          <ComponentsContainer width={width} height={height} zoomFactor={zoomFactor} />
          <CustomDragLayer  zoomFactor={zoomFactor} />
        </Zoomable>
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
