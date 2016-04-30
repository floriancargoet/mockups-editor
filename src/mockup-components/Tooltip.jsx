import React, { PropTypes, Component } from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';

function corner(a1, a2, radius) {
  const x2 = Math.cos(a1) * radius, y2 = -Math.sin(a1) * radius;
  const x = x2 + Math.cos(a2) * radius, y = y2 - Math.sin(a2) * radius;
  return `s ${x2},${y2} ${x},${y}`;
}
const PI = Math.PI;

class Tooltip extends Component {

  render() {
    const { width, height, properties } = this.props;
    const margin = Number(properties.strokeWidth) / 2;
    const rectRadius = Number(properties.radius) || 0;
    const arrowHeight = 33.66; // measured
    const arrowWidth = 14.1; // measured
    const x0 = arrowWidth, y0 = 0;

    const arrowPath = `
      ${corner(1.5 * PI, 1.25 * PI, 2)}
      l -12,12
      ${corner(1.25 * PI, 1.75 * PI, 2)}
      l 12,12
      ${corner(1.75 * PI, 1.5 * PI, 2)}
    `;
    const path = `
      m ${x0 + rectRadius + margin},${y0 + margin}
      ${corner(PI, 1.5 * PI, rectRadius)}
      l 0,${height / 2 - margin - rectRadius - arrowHeight / 2}
      ${arrowPath}
      l 0,${height / 2 - margin - rectRadius - arrowHeight / 2}
      ${corner(1.5 * PI, 0, rectRadius)}
      l ${width - x0 - 2 * margin - 2 * rectRadius}, 0
      ${corner(0, 0.5 * PI, rectRadius)}
      l 0, -${height - y0 - 2 * margin - 2 * rectRadius}
      ${corner(0.5 * PI, PI, rectRadius)}
      z
    `;
    const style = {
      fill: properties.backgroundColor,
      strokeWidth: properties.strokeWidth,
      stroke: 'black'
    };
    return (
      <svg height={height} width={width}>
        <path d={path} style={style} />

        <ForeignText
          x={x0} y={y0} width={width - x0} height={height - y0}
          hAlign={properties.hAlign} vAlign={properties.vAlign}
          style={{
            padding: 10,
            fontSize: properties.fontSize
          }}
        >
          {properties.text}
        </ForeignText>
      </svg>
    );
  }

}

Tooltip.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  properties: PropTypes.object
};

Tooltip.editors = {
  text: 'String',
  backgroundColor: 'Color',
  fontSize: 'Number'
};

Tooltip.create = (config = {}) => ({
  type: 'Tooltip',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  locked: false,
  ...config,

  properties: {
    text: '',
    backgroundColor: '#bada55',
    fontSize: 16,
    strokeWidth: 2,
    radius: 5,
    hAlign: 'left',
    vAlign: 'top',
    ...config.properties
  }
});

export default Tooltip;
