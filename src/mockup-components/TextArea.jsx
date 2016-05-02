import React from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';

const TextArea = ({ width, height, properties }) => {
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
      <ForeignText
        x={0} y={0} width={width} height={height}
        style={{ fontSize: properties.fontSize, padding: 5 }}
      >
        {properties.value}
      </ForeignText>
    </svg>
  );
};

TextArea.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

TextArea.editors = {
  backgroundColor: 'Color',
  value: 'String',
  fontSize: 'Number',
  strokeWidth: 'Number'
};

TextArea.create = (config = {}) => ({
  type: 'TextArea',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  locked: false,
  ...config,

  properties: {
    value: 'TextArea',
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    strokeWidth: 2,
    ...config.properties
  }
});

export default TextArea;
