import React, { PropTypes } from 'react';

const ForeignText = ({ x, y, width, height, hAlign, vAlign, text, noWrap, style, children }) => {
  style = {
    ...style,
    display: 'table-cell',
    textAlign: hAlign,
    verticalAlign: vAlign,
    whiteSpace: noWrap ? "no-wrap" : "default"
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
  noWrap: PropTypes.bool,
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
  noWrap: false,
  style: {}
};


export default ForeignText;
