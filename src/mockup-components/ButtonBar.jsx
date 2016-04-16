import React, { Component, PropTypes } from 'react';
import random from 'random-number-in-range';

function trim(str) {
  return str.trim();
}

/*
 * TODO:
 *  - buttonWidth based on real text width + margins
 */
class ButtonBar extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    properties: PropTypes.object
  };

  render() {
    const { width, height } = this.props;
    return (
      <svg height={height} width={width}>
        <rect x="3" y="3" height={height - 3} width={width - 3} style={{ fill: '#000' }} />
        { this.renderButtons() }
      </svg>
    );
  }

  renderButtons() {
    const { width, height, properties } = this.props;
    const texts = properties.text.split(',').map(trim);
    const totalLength = texts.join('').length;
    const totalWidth = (width - 3);
    let currentX = 0;
    return texts.map((t, i) => {
      const buttonWidth = totalWidth * (t.length / totalLength);
      const nodes = [
        <rect x={currentX} y="0" height={height - 3} width={buttonWidth}
          style={{
            fill: properties.backgroundColor,
            stroke: '#000'
          }}
        />,
        <text x={currentX + buttonWidth / 2} y="50%" textAnchor="middle" fontSize={properties.fontSize}>{t}</text>
      ];
      currentX += buttonWidth;
      return nodes;
    });
  }
}


ButtonBar.editors = {
  text: 'String',
  backgroundColor: 'Color',
  fontSize: 'Number'
};

ButtonBar.create = (config = {}) => ({
  type: 'ButtonBar',
  x: random(50, 500),
  y: random(50, 500),
  width: random(50, 200),
  height: random(50, 200),
  ...config,

  properties: {
    text: 'click, me',
    backgroundColor: '#ccc',
    fontSize: 16,
    ...config.properties
  }
});

export default ButtonBar;
