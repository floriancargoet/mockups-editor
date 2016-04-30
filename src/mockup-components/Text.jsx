import React from 'react';
import random from 'random-number-in-range';

import ForeignText from './sub/ForeignText.jsx';

const Text = ({ width, height, properties }) => {
  return (
    <svg height={height} width={width}>
      <ForeignText
        x={0} y={0} width={width} height={height}
        hAlign={properties.hAlign} vAlign={properties.vAlign}
        style={{ fontSize: properties.fontSize }}
      >
        {properties.text}
      </ForeignText>
    </svg>
  );
};

Text.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  properties: React.PropTypes.object
};

Text.editors = {
  text: 'String',
  fontSize: 'Number',
  alignment: 'String'
};

Text.create = (config = {}) => ({
  type: 'Text',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  locked: false,
  ...config,

  properties: {
    text: '',
    fontSize: 16,
    hAlign: 'left',
    vAlign: 'top',
    ...config.properties
  }
});

export default Text;
