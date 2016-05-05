import React, { Component, PropTypes } from 'react';
import { DragLayer } from 'react-dnd';
import { getPossibleAlignments, applyAlignments } from '../../../util/alignement';
import * as mockupComponents from '../../../mockup-components';

const alignerStyle = {
  stroke: 'black',
  strokeWidth: 1
};

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    offset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    zoomFactor: PropTypes.number.isRequired,
    components: PropTypes.array
  };

  render() {
    const { item, isDragging, components, offset, zoomFactor } = this.props;

    if (!isDragging || !offset) {
      return null;
    }

    let offsetX = offset.x / zoomFactor;
    let offsetY = offset.y / zoomFactor;
    const alignments = getPossibleAlignments(offsetX, offsetY, item.component, components);
    ({ offsetX, offsetY } = applyAlignments(offsetX, offsetY, alignments, item.component));
    const transform = `translate(${offsetX},${offsetY})`;
    return (
      <g>
        {this.renderAligners(alignments)}
        <g transform={transform}>
          {this.renderComponent(item.component)}
        </g>
      </g>
    );
  }


  renderComponent(component) {
    if (component.type === '__Group__') {
      return component.children.map((c) => this.renderComponent(c));
    }

    const ComponentClass = mockupComponents[component.type];
    const transform = `translate(${component.x}, ${component.y})`;

    return (
      <g key={component.id} transform={transform}>
        <ComponentClass {...component} />
      </g>
    );
  }

  renderAligners(alignments) {
    const aligners = [];
    if (alignments.x) {
      aligners.push(<line x1={alignments.x} y1={0} x2={alignments.x} y2={5000} style={alignerStyle} />);
    }
    if (alignments.y) {
      aligners.push(<line x1={0} y1={alignments.y} x2={5000} y2={alignments.y} style={alignerStyle} />);
    }
    return aligners;
  }

}


const DLDecorator = DragLayer(monitor => ({
  item: monitor.getItem(),
  offset: monitor.getDifferenceFromInitialOffset(),
  isDragging: monitor.isDragging()
}));

export default DLDecorator(CustomDragLayer);
