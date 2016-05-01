import React from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';

const TextField = ({ width, height, properties }) => {
  const rectRadius = Number(properties.radius) || 0;

  const style = {
    strokeWidth: properties.strokeWidth,
    stroke: 'black',
    fill: 'none'
  };
  const m = properties.strokeWidth / 2;

  return (
    <svg height={height} width={width}>
      <rect x={0 + m} y={0 + m} rx={rectRadius} width={width - 2 * m} height={height - 2 * m} style={style} />
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

TextField.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

TextField.editors = {
  value: 'String',
  fontSize: 'Number',
  strokeWidth: 'Number'
};

TextField.create = (config = {}) => ({
  type: 'TextField',
  resize: 'horizontal',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  locked: false,
  ...config,
  height: 30, // override

  properties: {
    value: 'TextField',
    fontSize: 16,
    strokeWidth: 2,
    ...config.properties
  }
});

export default TextField;
