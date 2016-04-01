import React from 'react';

const Title = ({ width, height, properties }) => (
  <div className="mockup-component mockup-title" style={{
    width, height,
    fontSize: 20,
    textAlign: 'center'
  }}>
    {properties.text}
  </div>
);

Title.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

export default Title;
