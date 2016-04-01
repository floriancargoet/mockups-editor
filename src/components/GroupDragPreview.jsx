import React, { Component, PropTypes } from 'react';
import * as components from '../mockup-components/all';

export default class GroupDragPreview extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    return (
      <g>
        {this.renderChildComponents(this.props.item.config.children)}
      </g>
    );
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
        </svg>
      );
    });
  }
}
