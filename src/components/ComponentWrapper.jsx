import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ResizableBox } from 'react-resizable';
import classnames from 'classnames';

import * as components from '../mockup-components/all';

const boxSource = {
  beginDrag(props) {
    const { id, config } = props;
    return { id, config, left: config.x, top: config.y };
  }
};

function getStyles(props) {
  const { config, isDragging } = props;
  const transform = `translate3d(${config.x}px, ${config.y}px, 0)`;

  return {
    position: 'absolute',
    cursor: 'move',
    transform: transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0.5 : 1
    // height: isDragging ? 0 : ''
  };
}

class ComponentWrapper extends Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,

    onResize: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    config: PropTypes.object.isRequired,
    id: PropTypes.any.isRequired
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
      onResize,
      config,
      ...otherProps
    } = this.props;

    const classNames = classnames({
      'mockup-component-wrapper': true,
      'mockup-component-wrapper_resizing': this.state.resizing,
      'mockup-component-wrapper_selected': this.props.selected
    });

    const ComponentClass = components[config.type];
    const component = <ComponentClass {...config} />;

    return (
      <ResizableBox
        {...otherProps}
        className={classNames}
        onResize={this.onResize} onResizeStart={this.onResizeStart} onResizeStop={this.onResizeStop}
        width={this.state.width} height={this.state.height}
        style={{ ...getStyles(this.props), width: this.state.width, height: this.state.height }}
      >
        {connectDragSource(<div className="draggable">{component}</div>)}
      </ResizableBox>
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
