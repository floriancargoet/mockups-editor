import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { DraggableCore } from 'react-draggable';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classnames from 'classnames';

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
    const { width, height, resizing } = this.state;

    const MockupComponent = components[config.type];
    const component = <MockupComponent {...config} width={width} height={height} />;
    const classNames = classnames({
      'mockup-component-wrapper': true,
      'mockup-component-wrapper_resizing': resizing,
      'mockup-component-wrapper_selected': selected
    });
    return (
      <svg className={classNames}
        {...otherProps}
        x={config.x} y = {config.y}
        width={width} height={height}
        style={getStyles(this.props)}
      >
        {connectDragSource(
          <g>
            {this.renderBackground()}
            {component}
            {this.renderBorder()}
          </g>
        )}
        {this.renderResizer()}
      </svg>
    );
  }

  renderBackground() {
    // fill=transparent makes :hover works
    return (
      <rect className="mockup-component-wrapper-background"
        x="0" y="0" width="100%" height="100%" fill="transparent"
      />
    );
  }

  renderBorder() {
    // fill=transparent makes :hover works
    return (
      <rect className="mockup-component-wrapper-border"
        x="0" y="0" width="100%" height="100%" fill="none"
      />
    );
  }

  renderResizer() {
    return (
      <DraggableCore
        onStart={this.onResizeStart}
        onDrag={this.onResize}
        onStop={this.onResizeStop}
      >
        <rect className="mockup-component-wrapper-resize-handle"
          x={this.state.width - 25} y={this.state.height - 25}
          width="15" height="15"
        />
      </DraggableCore>
    );
  }


  onResizeStart = (ev, { position }) => {
    this.startX = position.clientX;
    this.startY = position.clientY;
    this.setState({
      resizing: true
    });
  }

  onResize = (ev, { position }) => {
    const { width, height } = this.props.config;
    const dx = position.clientX - this.startX;
    const dy = position.clientY - this.startY;

    this.setState({
      width: Math.max(35, width + dx),
      height: Math.max(35, height + dy)
    });
  }

  onResizeStop = (ev, { position }) => {
    this.setState({
      resizing: false
    });

    const { width, height } = this.props.config;
    const dx = position.clientX - this.startX;
    const dy = position.clientY - this.startY;
    delete this.startX;
    delete this.startY;
    this.props.onResize(ev, {
      width: Math.max(35, width + dx),
      height: Math.max(35, height + dy)
    });
  }

}

export default DragSource('mockup-component', boxSource, (connect, monitor) => ({
  // injected props
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(ComponentWrapper);
