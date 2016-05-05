import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import * as components from '../../mockup-components';


function getStyles(props) {
  const { isDragging } = props;

  return {
    cursor: 'move',
    opacity: isDragging ? 0 : 1
  };
}

class GroupWrapper extends Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,

    id: PropTypes.any.isRequired,
    component: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired,
    onMouseDown: PropTypes.func.isRequired
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
      connectDragSource,
      component,
      onMouseDown
    } = this.props;

    let group = (
      <g
        style={getStyles(this.props)}
        onMouseDown={onMouseDown}
      >
        {this.renderChildComponents(component.children)}
      </g>
    );

    if (!component.locked) {
      group = connectDragSource(group);
    }

    return group;
  }

  renderChildComponents(childComponents) {
    return childComponents.map((c) => {
      if (c.type === '__Group__') {
        return (
          <g key={c.id}>
            {this.renderChildComponents(c.children)}
          </g>
        );
      }
      const MockupComponent = components[c.type];
      return (
        <svg key={c.id}
          x={c.x} y = {c.y}
          width={c.width} height={c.height}
        >
          <MockupComponent {...c} />
          {this.renderBorder(this.props.selected)}
        </svg>
      );
    });
  }

  renderBorder(selected) {
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

}

const groupSource = {
  beginDrag(props) {
    const { id, component } = props;
    return { id, component, x: component.x, y: component.y };
  }
};

export default DragSource('mockup-group', groupSource, (connect, monitor) => ({
  // injected props
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(GroupWrapper);
