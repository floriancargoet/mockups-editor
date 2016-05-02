import React from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';

function getTrianglePath(x, y, direction) {
  const size = 6;
  return `
    m ${x} ${y}
    l ${2 * size} 0
    l ${-size} ${direction === 'down' ? size : -size}
    z
  `;
}

const triangleStyle = {
  fill: 'black'
};

const NumberField = ({ width, height, properties }) => {
  const rectRadius = Number(properties.radius) || 0;

  const style = {
    strokeWidth: properties.strokeWidth,
    stroke: 'black',
    fill: properties.backgroundColor
  };
  const m = properties.strokeWidth / 2;

  return (
    <svg height={height} width={width}>
      <rect x={0 + m} y={0 + m} rx={rectRadius} width={width - 2 * m} height={height - 2 * m} style={style} />
      <path d={getTrianglePath(width - 20, height / 2 - 2, 'up')}   style={triangleStyle} />
      <path d={getTrianglePath(width - 20, height / 2 + 2, 'down')} style={triangleStyle} />
      <ForeignText
        x={0} y={0} width={width} height={height}
        vAlign="middle" noWrap
        style={{ fontSize: properties.fontSize, padding: 5 }}
      >
        {properties.value}
      </ForeignText>
    </svg>
  );
};

NumberField.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

NumberField.editors = {
  backgroundColor: 'Color',
  value: 'String',
  fontSize: 'Number',
  strokeWidth: 'Number'
};


NumberField.updateProperty = (component, property, value) => {
  if (property === 'fontSize') {
    return {
      ...component,
      height: 2 * value
    };
  }
  return component;
};

NumberField.create = (config = {}) => ({
  type: 'NumberField',
  resize: 'horizontal',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  locked: false,
  ...config,
  height: 30, // override

  properties: {
    value: '3.14',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    strokeWidth: 2,
    ...config.properties
  }
});

export default NumberField;
