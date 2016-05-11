import React, { Component, PropTypes } from 'react';
import Markdown from './Markdown.jsx';

export default class ForeignText extends Component {

  static propTypes = {
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
    markdown: PropTypes.bool,
    children: PropTypes.any
  }

  static defaultProps = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    hAlign: 'left',
    vAlign: 'top',
    text: '',
    noWrap: false,
    markdown: false,
    style: {}
  }

  render() {
    const { x, y, width, height, hAlign, vAlign, text, noWrap, markdown, children } = this.props;
    const style = {
      ...this.props.style,
      display: 'table-cell',
      textAlign: hAlign,
      verticalAlign: vAlign,
      whiteSpace: noWrap ? 'no-wrap' : 'default'
    };

    let textComponent = text || children;
    if (markdown) {
      textComponent = (<Markdown source={textComponent}/>);
    }

    return (
      <foreignObject x={x} y={y} width={width} height={height}>
        <div style={{ width, height, display: 'table' }}>
          <div style={style}>
            {textComponent}
          </div>
        </div>
      </foreignObject>
    );
  }

}
