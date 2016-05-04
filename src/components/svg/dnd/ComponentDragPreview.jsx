import React, { Component, PropTypes } from 'react';
import * as components from '../../../mockup-components';


export default class ComponentDragPreview extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const config = this.props.item.config;
    const ComponentClass = components[config.type];
    return (
      <g>
        <ComponentClass {...config} />
      </g>
    );
  }
}
