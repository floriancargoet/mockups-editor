import React, { PropTypes, Component } from 'react';
import random from 'random-number-in-range';

class Image extends Component {

  render() {
    const { width, height, properties } = this.props;
    const rectRadius = Number(properties.radius) || 0;

    const style = {
      strokeWidth: properties.strokeWidth,
      stroke: 'black',
      fill: properties.backgroundColor
    };
    const m = properties.strokeWidth / 2;
    return (
      <svg height={height} width={width}>
        <defs>
          <clipPath id="clip">
          <rect x={0 + m} y={0 + m} rx={rectRadius} width={width - 2 * m} height={height - 2 * m}/>
          </clipPath>
        </defs>

        <rect x={0 + m} y={0 + m} rx={rectRadius} width={width - 2 * m} height={height - 2 * m} style={style} />
        <g clipPath="url(#clip)">
          <line x1={0} y1={0} x2={width} y2={height} style={style}/>
          <line x1={width} y1={0} x2={0} y2={height} style={style}/>
        </g>
      </svg>
    );
  }

}

Image.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  properties: PropTypes.object
};

Image.editors = {
  backgroundColor: 'Color',
  strokeWidth: 'Number',
  radius: 'Number'
};

Image.create = (config = {}) => ({
  type: 'Image',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  locked: false,
  ...config,

  properties: {
    backgroundColor: '#FFFFFF',
    strokeWidth: 2,
    radius: 0,
    ...config.properties
  }
});

export default Image;
