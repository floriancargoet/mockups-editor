import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classnames from 'classnames';

import Resizable from './Resizable.jsx';
import * as components from '../../mockup-components';

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
    opacity: isDragging ? 0 : 1
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
    onMouseDown: PropTypes.func.isRequired,
    zoomFactor: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      width: props.config.width, height: props.config.height,
      x: props.config.x, y: props.config.y
    };
  }

  componentWillReceiveProps({ config }) {
    this.setState({
      width: config.width, height: config.height,
      x: config.x, y: config.y
    });
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

  render() {
    const { // list all props to remove from otherProps
      connectDragSource,
      config,
      selected,
      zoomFactor,
      isDragging,
      onMouseDown
    } = this.props;
    const { x, y, width, height, resizing } = this.state;

    const MockupComponent = components[config.type];
    let component = <MockupComponent {...config} width={width} height={height} />;
    const classNames = classnames({
      'mockup-component-wrapper': true,
      'mockup-component-wrapper_resizing': resizing,
      'mockup-component-wrapper_selected': selected
    });

    component = (
      <g
        onMouseDown={onMouseDown}
        className={classNames}
        style={getStyles(this.props)}
      >
        {this.renderBackground()}
        {component}
      </g>
    );

    if (!config.locked) {
      component = connectDragSource(component);
    }
    // resizing constraints
    const resize = config.resize || 'both';

    return (
      <Resizable
        x={x} y={y}
        width={width} height={height}
        showBorder={selected && !isDragging}
        showHandles={selected && !isDragging && !config.locked}
        vertical={resize === 'both' || resize === 'vertical'}
        horizontal={resize === 'both' || resize === 'horizontal'}
        zoomFactor={zoomFactor} // to keep an un-zoomed appearence
        onResizeStart={this.onResizeStart}
        onResize={this.onResize}
        onResizeStop={this.onResizeStop}
      >
        {component}
      </Resizable>
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


  onResizeStart = () => {
    this.setState({
      resizing: true
    });
  }

  onResize = (size) => {
    this.setState(size);
  }

  onResizeStop = (size) => {
    this.setState({
      resizing: false
    });
    this.props.onResize(size);
  }

}

export default DragSource('mockup-component', boxSource, (connect, monitor) => ({
  // injected props
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(ComponentWrapper);
