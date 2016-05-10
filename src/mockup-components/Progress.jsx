import React, { Component, PropTypes } from 'react';
import random from 'random-number-in-range';




export default class Progress extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    properties: PropTypes.object
  }

  static editors = {
    progress: {
      type: 'Slider',
      min: 0,
      max: 100,
      step: 1
    },
    backgroundColor: 'Color',
    progressColor: 'Color'
  }

  static create = (config = {}) => ({
    type: 'Progress',
    x: random(50, 500),
    y: random(50, 500),
    width: random(50, 200),
    height: random(50, 200),
    locked: false,
    ...config,

    properties: {
      progress: 50,
      backgroundColor: '#ffffff',
      progressColor: '#337AB7',
      ...config.properties
    }
  })

  render() {
    const { width, height, properties } = this.props;
    const containerStyle = {
      stroke: 'black',
      strokeWidth: 2,
      fill: properties.backgroundColor
    };

    const progressStyle = {
      stroke: 'none',
      fill: properties.progressColor
    };

    return (
      <svg height={height} width={width}>
        <rect x="1" y="1" height={height - 2} width={width - 2} style={containerStyle} />
        <rect x="2" y="2" height={height - 4} width={(width - 4) * (properties.progress / 100)} style={progressStyle} />
      </svg>
    );
  }
}
