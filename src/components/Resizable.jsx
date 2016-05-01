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
  else if (direction === 'n') {
    return {
      x: 0,
      y: dy,
      width: 0,
      height: -dy
    };
  }
  else if (direction === 'e') {
    return {
      x: 0,
      y: 0,
      width: dx,
      height: 0
    };
  }
  else if (direction === 's') {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: dy
    };
  }
  else if (direction === 'w') {
    return {
      x: dx,
      y: 0,
      width: -dx,
      height: 0
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
    showBorder: PropTypes.bool.isRequired,
    showHandles: PropTypes.bool.isRequired,
    zoomFactor: PropTypes.number.isRequired,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    vertical: true,
    horizontal: true
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const margin = 10 / this.props.zoomFactor;
    const { x, y, showBorder, showHandles } = this.props;
    return (
      <g
        transform={`translate(${x - margin} ${y - margin})`}
      >
        <g transform={`translate(${margin} ${margin})`}>
          {this.props.children}
        </g>
        {showBorder && this.renderBorder()}
        {showHandles && this.renderResizers()}
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
    const { width, height, zoomFactor, horizontal, vertical } = this.props;
    const size = 10 / zoomFactor;
    const commonProps = {
      size: size,
      onResizeStart: this.onResizeStart,
      onResize: this.onResize,
      onResizeStop: this.onResizeStop
    };

    const handles = [];
    if (vertical) {
      handles.push(
        ['n', (width + size) / 2, 0],
        ['s', (width + size) / 2, height + size]
      );
    }
    if (horizontal) {
      handles.push(
        ['e', width + size, (height + size) / 2],
        ['w', 0, (height + size) / 2]
      );
    }
    if (horizontal && vertical) {
      handles.push(
        ['se', width + size, height + size],
        ['nw', 0, 0],
        ['ne', width + size, 0],
        ['sw', 0, height + size],
      );
    }

    return handles.map(([position, x, y]) =>
      <ResizeHandle {...{ ...commonProps, x, y, position }} key={position} />
    );
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
