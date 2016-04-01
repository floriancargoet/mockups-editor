import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import * as components from '../mockup-components/all';

const boxSource = {
  beginDrag(props) {
    const { id, config } = props;
    return { id, config, left: config.x, top: config.y };
  }
};

function getStyles(props) {
  const { isDragging } = props;

  return {
    cursor: 'move',
    opacity: isDragging ? 0.5 : 1
  };
}

class ComponentWrapper extends Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,

    id: PropTypes.any.isRequired,
    config: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // in progress resize is managed in state
      width: props.config.width,
      height: props.config.height,
      resizing: false
    };
  }

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true
    });
  }

  componentWillReceiveProps({ config }) {
    this.setState({
      width: config.width, height: config.height
    });
  }

  render() {
    const { // list all props to remove from otherProps
      connectDragSource,
      config,
      selected,
      ...otherProps
    } = this.props;

    const MockupComponent = components[config.type];
    const component = <MockupComponent {...config} />;

    return (
      <svg
        {...otherProps}
        x={config.x} y = {config.y}
        width={config.width} height={config.height}
        style={getStyles(this.props)}
      >
        {connectDragSource(<g>{component}</g>)}
        {this.renderSelectionBorder(selected)}
      </svg>
    );
  }

  renderSelectionBorder(selected) {
    if (!selected) {
      return null;
    }
    return (
      <rect
        x="0" y="0" width="100%" height="100%" strokeDasharray="10, 5"
        strokeWidth="3" stroke="#333" fill="none"
      />
    );
  }

  onResizeStart = (ev, { size }) => {
    this.setState({
      resizing: true
    });
  }

  onResize = (ev, { size }) => {
    this.setState({
      ...size
    });
  }

  onResizeStop = (ev, info) => {
    this.setState({
      resizing: false
    });
    this.props.onResize(ev, info);
  }

}

export default DragSource('mockup-component', boxSource, (connect, monitor) => ({
  // injected props
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(ComponentWrapper);
