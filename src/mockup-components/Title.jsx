import React from 'react';

const Title = ({ width, height, properties }) => (
  <svg height={height} width={width}>
    <text x="50%" y="50%" textAnchor="middle" fontSize={20}>{properties.text}</text>
  </svg>
);

Title.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

export default Title;
