import React, { Component, PropTypes } from 'react';
import * as components from '../mockup-components/all';

const styles = {
  display: 'block',
  //transform: 'rotate(-7deg)',
  //WebkitTransform: 'rotate(-7deg)',
  outline: '1px solid #ccc'
};

export default class ComponentDragPreview extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const config = this.props.item.config;
    const ComponentClass = components[config.type];
    return (
      <div style={{
        ...styles,
        width: config.width, height: config.height
      }}>
        <ComponentClass {...config} />
      </div>
    );
  }
}
