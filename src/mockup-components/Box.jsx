import React from 'react';

const Box = ({ width, height, properties }) => (
  <svg className="mockup-component mockup-box"
    height={height} width={width}
  >

    <rect x="0" y="0"
      height={height} width={width}
      style={{ fill: properties.backgroundColor }}
    >
    </rect>
    <text x="10" y="30">{properties.text}</text>
    <text x="100%" y="100%" dy="-.8em" dx="-.8em" textAnchor="end" fontSize="12">SVG, just because</text>

</svg>
);

Box.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

export default Box;
