import React from 'react';

const Button = ({ width, height, properties }) => (
  <svg height={height} width={width}>
    <rect x="0" y="0"
      height={height} width={width}
      style={{
        fill: properties.backgroundColor,
        stroke: '#000'
      }}
    />
    <text x="50%" y="50%" textAnchor="middle">{properties.text}</text>
  </svg>
);

Button.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

export default Button;
