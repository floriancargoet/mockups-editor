import React, { Component, PropTypes } from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';


export default class Title extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    properties: PropTypes.object
  }

  static editors = {
    text: 'String',
    fontSize: 'Number',
    hAlign: 'HorizontalAlign'
  }

  static updateProperty = (component, property, value) => {
    if (property === 'fontSize') {
      return {
        ...component,
        height: 1.5 * value
      };
    }
    return component;
  }

  static create = (config = {}) => ({
    type: 'Title',
    resize: 'horizontal',
    x: random(50, 500),
    y: random(50, 500),
    width: random(50, 200),
    locked: false,
    ...config,
    height: 32 * 1.5, // override

    properties: {
      text: 'Title',
      fontSize: 32,
      hAlign: 'center',
      ...config.properties
    }
  })

  render() {
    const { width, height, properties } = this.props;

    return (
      <svg height={height} width={width}>
        <ForeignText
          x={0} y={0} width={width} height={height}
          vAlign="middle" hAlign={properties.hAlign} noWrap
          style={{ fontSize: properties.fontSize }}
        >
          {properties.text}
        </ForeignText>
      </svg>
    );

  }
}
