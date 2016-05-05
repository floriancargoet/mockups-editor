import React, { Component, PropTypes } from 'react';
import * as mockupComponents from '../../mockup-components';

export default class MockupPreview extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    components: PropTypes.array
  };

  render() {
    const { width, height, components } = this.props;
    const viewBox = `0 0 ${10 * width} ${10 * height}`;
    return (
      <svg width={width} height={height} viewBox={viewBox}>
      {
        components.map(c => this.renderComponent(c))
      }
      </svg>
    );
  }

  renderComponent(component) {
    if (component.type === '__Group__') {
      return (
        <g>
          {this.renderChildComponents(component.children)}
        </g>
      );
    }
    else {
      const ComponentClass = mockupComponents[component.type];
      const transform = `translate(${component.x}, ${component.y})`;

      return (
        <g key={component.id} transform={transform}>
          <ComponentClass {...component} />
        </g>
      );
    }
  }

  renderChildComponents(childComponents) {
    return childComponents.map((c) => this.renderComponent(c));
  }
}
