import React, { Component, PropTypes } from 'react';
import random from 'random-number-in-range';


function map(value, minA, maxA, minB, maxB) {
  return minB + (value - minA) * (maxB - minB) / (maxA - minA);
}

function getTrianglePath(x, y, direction) {
  const size = 6;
  return `
    m ${x - size} ${y}
    l ${2 * size} 0
    l ${-size} ${direction === 'down' ? size : -size}
    z
  `;
}

const triangleStyle = {
  fill: 'black'
};

const style = {
  stroke: 'black',
  strokeWidth: 2,
  fill: 'none'
};


export default class VerticalScrollBar extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    properties: PropTypes.object
  }

  static editors = {
    position: {
      type: 'Slider',
      min: 0,
      max: 100,
      step: 1
    },
    backgroundColor: 'Color'
  }

  static create = (config = {}) => ({
    type: 'VerticalScrollBar',
    resize: 'vertical',
    x: random(50, 500),
    y: random(50, 500),
    height: random(50, 200),
    locked: false,
    ...config,
    width: 18,

    properties: {
      position: 0,
      backgroundColor: '#ffffff',
      ...config.properties
    }
  })

  render() {
    const { width, height, properties } = this.props;
    const arrowHeight = 20;
    const handleSize = 14;
    const handleCenterY = map(properties.position, 0, 100, arrowHeight, height - arrowHeight);
    return (
      <svg height={height} width={width}>
        <rect x="1" y="1" height={height - 2} width={width - 2} style={{ ...style, fill: properties.backgroundColor }} />
        <rect x={(width - handleSize) / 2} y={handleCenterY - handleSize / 2} height={handleSize} width={handleSize} style={style} />
        <path d={getTrianglePath(width / 2, arrowHeight - 10, 'up')} style={triangleStyle} />
        <path d={getTrianglePath(width / 2, height - (arrowHeight - 10), 'down')} style={triangleStyle} />
      </svg>
    );
  }
}
