import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import CustomDragLayer from '../../connectors/svg/dnd/CustomDragLayer';
import PanZoom from './PanZoom.jsx';
import InPlaceEditor from '../InPlaceEditor.jsx';
import ComponentsContainer from '../../connectors/svg/ComponentsContainer';


class Workspace extends Component {

  static propTypes = {
    componentToEditInPlace: PropTypes.object,
    onInPlacePropertyChange: PropTypes.func.isRequired,
    panZoomMatrix: PropTypes.array.isRequired,
    onPanZoom: PropTypes.func.isRequired,
    onDoubleMiddleClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0
    };
  }

  render() {
    const { width, height } = this.state;
    const { panZoomMatrix, onPanZoom, onDoubleMiddleClick } = this.props;
    const zoomFactor = panZoomMatrix[0];
    return (
      <svg height="100%" width="100%">
        <PanZoom
          zoomSpeed={0.2} panZoomMatrix={panZoomMatrix} panHandle=".background"
          onPanZoom={onPanZoom} onDoubleMiddleClick={onDoubleMiddleClick}
        >
          <ComponentsContainer width={width} height={height} zoomFactor={zoomFactor} />
          <CustomDragLayer zoomFactor={zoomFactor} />
        </PanZoom>
        {this.renderInPlaceEditor()}
      </svg>
    );
  }

  renderInPlaceEditor() {
    const component = this.props.componentToEditInPlace;
    if (component) {
      return (
        <InPlaceEditor
          component={component} panZoomMatrix={this.props.panZoomMatrix}
          onChange={this.props.onInPlacePropertyChange}
        />
      );
    }
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
