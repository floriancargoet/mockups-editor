import React, { Component, PropTypes } from 'react';
import ResizeHandle from './ResizeHandle.jsx';


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


export default class Resizable extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    enabled: PropTypes.bool.isRequired,
    zoomFactor: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const margin = 10 / this.props.zoomFactor;
    const { x, y, enabled } = this.props;
    return (
      <g
        transform={`translate(${x - margin} ${y - margin})`}
      >
        <g transform={`translate(${margin} ${margin})`}>
          {this.props.children}
        </g>
        {enabled && this.renderBorder()}
        {enabled && this.renderResizers()}
      </g>
    );
  }

  renderBorder() {
    const { width, height, zoomFactor } = this.props;
    return (
      <rect className="mockup-component-wrapper-border"
        style={{
          strokeWidth: 2 / zoomFactor
        }}
        x={10 / zoomFactor} y={10 / zoomFactor} width={width} height={height} fill="none"
      />
    );
  }

  renderResizers() {
    const { width, height, zoomFactor } = this.props;
    const size = 10 / zoomFactor;
    return [
      <ResizeHandle
        key="se" position="se" size={size}
        x={width + size} y={height + size}
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
        x={width + size} y={0}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      />,
      <ResizeHandle
        key="sw" position="sw" size={size}
        x={0} y={height + size}
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      />
    ];
  }

  onResizeStart = (handle, ev, { position }) => {
    this.startClientX = position.clientX;
    this.startClientY = position.clientY;
    const { x, y, width, height } = this.props;
    this.initialSize = { x, y, width, height };
    this.props.onResizeStart();
  }

  onResize = (handle, ev, { position }) => {
    const dx = (position.clientX - this.startClientX) / this.props.zoomFactor;
    const dy = (position.clientY - this.startClientY) / this.props.zoomFactor;
    const delta = getDelta(handle, dx, dy);
    const size = applyDelta(delta, this.initialSize);
    this.props.onResize(size);
  }

  onResizeStop = (handle, ev, { position }) => {
    const dx = (position.clientX - this.startClientX) / this.props.zoomFactor;
    const dy = (position.clientY - this.startClientY) / this.props.zoomFactor;
    const delta = getDelta(handle, dx, dy);
    const size = applyDelta(delta, this.initialSize);

    delete this.startClientX;
    delete this.startClientY;
    delete this.initialSize;
    this.props.onResizeStop(size);
  }

}
