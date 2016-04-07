import React from 'react';
import random from 'random-number-in-range';

const Title = ({ width, height, properties }) => (
  <svg height={height} width={width}>
    <text x="50%" y="50%" textAnchor="middle" fontSize={properties.fontSize}>{properties.text}</text>
  </svg>
);

Title.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

Title.create = (config = {}) => ({
  type: 'Title',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  ...config,

  properties: {
    text: 'Title',
    fontSize: 20,
    ...config.properties
  }
});

export default Title;
