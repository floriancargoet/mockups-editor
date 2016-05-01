import React from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';

const Box = ({ width, height, properties }) => (
  <svg height={height} width={width}>
    <rect x="0" y="0"
      height={height} width={width}
      style={{ fill: properties.backgroundColor }}
    >
    </rect>
    <ForeignText
      width={width} height={height}
      style={{ fontSize: properties.fontSize }}
    >
      {properties.text}
    </ForeignText>
  </svg>
);

Box.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

Box.editors = {
  text: 'String',
  backgroundColor: 'Color',
  fontSize: 'Number'
};

Box.create = (config = {}) => ({
  type: 'Box',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  locked: false,
  ...config,

  properties: {
    text: 'Box',
    backgroundColor: '#bada55',
    fontSize: 16,
    ...config.properties
  }
});

export default Box;
