import React from 'react';
import { DraggableCore } from 'react-draggable';

class ResizeHandle extends React.Component {

  static defaultProps = {
    handleSize: 10
  };

  render() {
    const { handleSize } = this.props;
    return (
      <DraggableCore
        onStart={this.onResizeStart}
        onDrag={this.onResize}
        onStop={this.onResizeStop}
      >
        <rect className="mockup-component-wrapper-resize-handle"
          x={this.props.x} y={this.props.y}
          width={handleSize} height={handleSize}
        />
      </DraggableCore>
    );
  }

  renderHandle(position) {

  }
  onResizeStart = (...args) => {
    this.props.onResizeStart(this.props.position, ...args);
  }
  onResize = (...args) => {
    this.props.onResize(this.props.position, ...args);
  }
  onResizeStop = (...args) => {
    this.props.onResizeStop(this.props.position, ...args);
  }
}

ResizeHandle.propTypes = {
  handleSize: React.PropTypes.number,
  x: React.PropTypes.number,
  y: React.PropTypes.number,
  position: React.PropTypes.string,
  onResizeStart: React.PropTypes.func,
  onResize: React.PropTypes.func,
  onResizeStop: React.PropTypes.func
};

export default ResizeHandle;
