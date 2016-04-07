import React from 'react';
import random from 'random-number-in-range';

const Button = ({ width, height, properties }) => (
  <svg height={height} width={width}>
    <rect x="3" y="3" height={height - 3} width={width - 3} style={{ fill: '#000' }} />
    <rect x="0" y="0" height={height - 3} width={width - 3}
      style={{
        fill: properties.backgroundColor,
        stroke: '#000'
      }}
    />
    <text x="50%" y="50%" textAnchor="middle" fontSize={properties.fontSize}>{properties.text}</text>
  </svg>
);

Button.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

Button.create = (config = {}) => ({
  type: 'Button',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  ...config,

  properties: {
    text: 'click me',
    backgroundColor: '#ccc',
    fontSize: 16,
    ...config.properties
  }
});

export default Button;
