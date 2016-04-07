import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classnames from 'classnames';

import ResizeHandle from './ResizeHandle.jsx';
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

function getDelta(direction, dx, dy) {
  if (direction === 'se') {
    return {
      x: 0,
      y: 0,
      width: dx,
      height: dy
    };
  }
  else if (direction === 'nw') {
    return {
      x: dx,
      y: dy,
      width: -dx,
      height: -dy
    };
  }
  else if (direction === 'ne') {
    return {
      x: 0,
      y: dy,
      width: dx,
      height: -dy
    };
  }
  else if (direction === 'sw') {
    return {
      x: dx,
      y: 0,
      width: -dx,
      height: dy
    };
  }
}
const MIN_SIZE = 10;

function applyDelta(delta, size) {
  return {
    x: Math.min(size.x + delta.x, size.x + size.width - MIN_SIZE),
    y: Math.min(size.y + delta.y, size.y + size.height - MIN_SIZE),
    width: Math.max(size.width + delta.width, MIN_SIZE),
    height: Math.max(size.height + delta.height, MIN_SIZE)
  };
}


class ComponentWrapper extends Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,

    id: PropTypes.any.isRequired,
    config: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onResize: PropTypes.func.isRequired,
    zoomFactor: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      // in progress resize is managed in state
      width: props.config.width,
      height: props.config.height,
      x: props.config.x,
      y: props.config.y,
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
      width: config.width, height: config.height,
      x: config.x, y: config.y
    });
  }

  render() {
    const { // list all props to remove from otherProps
      connectDragSource,
      config,
      selected,
      ...otherProps
    } = this.props;
    const { width, height, x, y, resizing } = this.state;

    const MockupComponent = components[config.type];
    const component = <MockupComponent {...config} width={width} height={height} />;
    const classNames = classnames({
      'mockup-component-wrapper': true,
      'mockup-component-wrapper_resizing': resizing,
      'mockup-component-wrapper_selected': selected
    });
    const margin = 10 / this.props.zoomFactor;
    return (
      <g className={classNames}
        {...otherProps}
        transform={`translate(${x - margin} ${y - margin})`}
        width={width + 2 * margin} height={height + 2 * margin}
        style={getStyles(this.props)}
      >
        {connectDragSource(
          <g transform={`translate(${margin} ${margin})`}>
            {this.renderBackground()}
            {component}
          </g>
        )}
        {this.renderBorder()}
        {this.renderResizers()}
      </g>
    );
  }

  renderBackground() {
    // fill=transparent makes :hover works
    const { width, height } = this.state;
    return (
      <rect className="mockup-component-wrapper-background"
        x="0" y="0" width={width} height={height} fill="transparent"
      />
    );
  }

  renderBorder() {
    const { width, height } = this.state;
    return (
      <rect className="mockup-component-wrapper-border"
        style={{
          strokeWidth: this.props.selected ? 2 / this.props.zoomFactor : 0
        }}
        x={10 / this.props.zoomFactor} y={10 / this.props.zoomFactor} width={width} height={height} fill="none"
      />
    );
  }

  renderResizers() {
    const size = 10 / this.props.zoomFactor;
    return [
      <ResizeHandle
        key="se" position="se" size={size}
        x={this.state.width + size} y={this.state.height + size}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      />,
      <ResizeHandle
        key="nw" position="nw" size={size}
        x={0} y={0}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      />,
      <ResizeHandle
        key="ne" position="ne" size={size}
        x={this.state.width + size} y={0}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      />,
      <ResizeHandle
        key="sw" position="sw" size={size}
        x={0} y={this.state.height + size}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      />
    ];
  }

  onResizeStart = (handle, ev, { position }) => {
    this.startX = position.clientX;
    this.startY = position.clientY;
    this.setState({
      resizing: true
    });
  }

  onResize = (handle, ev, { position }) => {
    const dx = (position.clientX - this.startX) / this.props.zoomFactor;
    const dy = (position.clientY - this.startY) / this.props.zoomFactor;
    const delta = getDelta(handle, dx, dy);
    const size = applyDelta(delta, this.props.config);

    this.setState(size);
  }

  onResizeStop = (handle, ev, { position }) => {
    this.setState({
      resizing: false
    });

    const dx = (position.clientX - this.startX) / this.props.zoomFactor;
    const dy = (position.clientY - this.startY) / this.props.zoomFactor;
    const delta = getDelta(handle, dx, dy);
    const size = applyDelta(delta, this.props.config);

    delete this.startX;
    delete this.startY;
    this.props.onResize(ev, size);
  }

}

export default DragSource('mockup-component', boxSource, (connect, monitor) => ({
  // injected props
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(ComponentWrapper);
