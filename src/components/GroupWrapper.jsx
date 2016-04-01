import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import classnames from 'classnames';

import * as components from '../mockup-components/all';

const boxSource = {
  beginDrag(props) {
    const { id, config } = props;
    return { id, left: config.x, top: config.y };
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

class GroupWrapper extends Component {

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

  render() {
    const { // list all props to remove from otherProps
      config, selected,
      connectDragSource,
      ...otherProps
    } = this.props;

    const classNames = classnames({
      draggable: true,
      'mockup-group-wrapper': true,
      'mockup-group-wrapper_selected': selected
    });

    return connectDragSource(<div {...otherProps} className={classNames}
      style={{
        ...getStyles(this.props),
        width: config.width, height: config.height
      }}>
      {this.renderChildComponents()}
    </div>);
  }

  renderChildComponents() {
    return this.props.config.children.map((c, i) => {
      const MockupComponent = components[c.type];
      return <MockupComponent key={i} {...c} />;
    });
  }

}

export default DragSource('mockup-component', boxSource, (connect, monitor) => ({
  // injected props
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(GroupWrapper);
