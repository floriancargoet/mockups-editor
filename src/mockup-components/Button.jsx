import React from 'react';

const Button = ({ width, height, properties }) => (
  <div
    className="mockup-component mockup-button"
    style={{ width, height }}
  >
    <button style={{ width: '100%', height: '100%' }}>roperties.text}</button>
  </div>
);

Button.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

export default Button;
