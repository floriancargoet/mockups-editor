import React, { PropTypes } from 'react';

const ForeignText = ({ x, y, width, height, hAlign, vAlign, text, style, children }) => {
  style = {
    ...style,
    display: 'table-cell',
    textAlign: hAlign,
    verticalAlign: vAlign
  };
  return (
    <foreignObject x={x} y={y} width={width} height={height}>
      <div style={{ width, height, display: 'table' }}>
        <div style={style}>
          {text || children}
        </div>
      </div>
    </foreignObject>
  );
};


ForeignText.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  hAlign: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
  vAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
  fontSize: PropTypes.number,
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
};

ForeignText.defaultProps = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  hAlign: 'left',
  vAlign: 'top',
  text: '',
  style: {}
};


export default ForeignText;
