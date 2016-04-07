import React, { Component, PropTypes } from 'react';
import ComponentDragPreview from './ComponentDragPreview.jsx';
import GroupDragPreview from './GroupDragPreview.jsx';
import { DragLayer } from 'react-dnd';

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

  renderItem(type, item) {
    switch (type) {
      case 'mockup-component':
        return (
          <ComponentDragPreview item={item}/>
        );
      case 'mockup-group':
        return (
          <GroupDragPreview item={item}/>
        );
      default:
        return null;
    }
  }

  render() {
    const { item, itemType, isDragging, offset, zoomFactor } = this.props;

    if (!isDragging || !offset) {
      return null;
    }
    const x = offset.x / zoomFactor + item.config.x;
    const y = offset.y / zoomFactor + item.config.y;
    const transform = `translate(${x}, ${y})`;
    return (
      <g transform={transform}>
        {this.renderItem(itemType, item)}
      </g>
    );
  }
}


const DLDecorator = DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  offset: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging()
}));

export default DLDecorator(CustomDragLayer);
