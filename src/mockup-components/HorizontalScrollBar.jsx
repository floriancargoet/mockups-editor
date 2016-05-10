import React, { Component, PropTypes } from 'react';
import random from 'random-number-in-range';


function map(value, minA, maxA, minB, maxB) {
  return minB + (value - minA) * (maxB - minB) / (maxA - minA);
}

function getTrianglePath(x, y, direction) {
  const size = 6;
  return `
    m ${x} ${y - 6}
    l 0 ${2 * size}
    l ${direction === 'right' ? size : -size} ${-size}
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


export default class HorizontalScrollBar extends Component {
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
    type: 'HorizontalScrollBar',
    resize: 'horizontal',
    x: random(50, 500),
    y: random(50, 500),
    width: random(50, 200),
    locked: false,
    ...config,
    height: 18,

    properties: {
      position: 0,
      backgroundColor: '#ffffff',
      ...config.properties
    }
  })

  render() {
    const { width, height, properties } = this.props;
    const arrowWidth = 20;
    const handleSize = 14;
    const handleCenterX = map(properties.position, 0, 100, arrowWidth, width - arrowWidth);
    return (
      <svg height={height} width={width}>
        <rect x="1" y="1" height={height - 2} width={width - 2} style={{ ...style, fill: properties.backgroundColor }} />
        <rect y={(height - handleSize) / 2} x={handleCenterX - handleSize / 2} height={handleSize} width={handleSize} style={style} />
        <path d={getTrianglePath(arrowWidth - 10, height / 2, 'left')} style={triangleStyle} />
        <path d={getTrianglePath(width - (arrowWidth - 10), height / 2, 'right')} style={triangleStyle} />
      </svg>
    );
  }
}
