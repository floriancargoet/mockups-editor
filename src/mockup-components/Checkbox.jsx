import React, { Component, PropTypes } from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';

// TODO:
// - indeterminate state
const boxStyle = {
  strokeWidth: 2,
  stroke: 'black',
  fill: 'white'
};

const checkStyle = {
  strokeWidth: 1.5,
  stroke: 'black',
  fill: 'none'
};

class Checkbox extends Component {
  render() {
    const { width, height, properties } = this.props;

    const checkPath = `
      m 4 ${height / 2 - 1}
      l 3 4
      l 5 -7
    `;
    return (
      <svg height={height} width={width}>
        <rect x={2} y={(height - 12) / 2} width={12} height={12} style={boxStyle} />
        {properties.checked ? <path d={checkPath} style={checkStyle} /> : null}
        <ForeignText
          x={20} y={0} width={width - 20} height={height}
          vAlign="middle" noWrap
          style={{ fontSize: properties.fontSize }}
        >
          {properties.text}
        </ForeignText>
      </svg>
    );

  }
}


Checkbox.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  properties: PropTypes.object
};

Checkbox.editors = {
  checked: 'Boolean',
  fontSize: 'Number',
  text: 'String'
};


Checkbox.updateProperty = (component, property, value) => {
  if (property === 'fontSize') {
    return {
      ...component,
      height: 2 * value
    };
  }
  return component;
};

Checkbox.create = (config = {}) => ({
  type: 'Checkbox',
  resize: 'horizontal',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  locked: false,
  ...config,
  height: 30, // override

  properties: {
    text: 'Checkbox',
    checked: false,
    fontSize: 16,
    ...config.properties
  }
});

export default Checkbox;
