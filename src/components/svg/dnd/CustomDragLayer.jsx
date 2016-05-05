import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import * as components from '../../../mockup-components';

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    offset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    zoomFactor: PropTypes.number.isRequired
  };

  render() {
    const { item, isDragging, offset, zoomFactor } = this.props;

    if (!isDragging || !offset) {
      return null;
    }
    const x = offset.x / zoomFactor;
    const y = offset.y / zoomFactor;
    const transform = `translate(${x}, ${y})`;
    return (
      <g transform={transform}>
        {this.renderComponent(item.component)}
      </g>
    );
  }


  renderComponent(component) {
    if (component.type === '__Group__') {
      return component.children.map((c) => this.renderComponent(c));
    }

    const ComponentClass = components[component.type];
    const transform = `translate(${component.x}, ${component.y})`;

    return (
      <g key={component.id} transform={transform}>
        <ComponentClass {...component} />
      </g>
    );
  }
}


const DLDecorator = DragLayer(monitor => ({
  item: monitor.getItem(),
  offset: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging()
}));

export default DLDecorator(CustomDragLayer);
