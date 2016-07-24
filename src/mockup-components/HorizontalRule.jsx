import React, { Component, PropTypes } from 'react';
import random from 'random-number-in-range';

const style = {
  stroke: 'none',
  fill: 'black'
};

export default class HorizontalRule extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    properties: PropTypes.object
  }

  static editors = {
  }

  static create = (config = {}) => ({
    type: 'HorizontalRule',
    resize: 'horizontal',
    x: random(50, 500),
    y: random(50, 500),
    width: random(50, 200),
    locked: false,
    ...config,
    height: 10,

    properties: {
      ...config.properties
    }
  })

  render() {
    const { width, height } = this.props;
    return (
      <svg height={height} width={width}>
        <rect x="4" y="4" height={height - 8} width={width - 8} style={style} />
      </svg>
    );
  }
}
