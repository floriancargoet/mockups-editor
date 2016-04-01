import React, { Component, PropTypes } from 'react';
import * as components from '../mockup-components/all';

export default class GroupDropPreview extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    return (
      <g>
        {this.renderChildComponents()}
      </g>
    );
  }

  renderChildComponents() {
    const config = this.props.item.config;
    return config.children.map((c) => {
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
