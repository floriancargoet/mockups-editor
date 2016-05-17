import React, { Component, PropTypes } from 'react';
import getInPlaceProperty from '../../util/getInPlaceProperty';
/*
 * This editor is different. It's not displayed in the property editor but in an
 * overlay over the Workspace. It receives the whole component.
 */


const style = {
  width: '100%',
  height: '100%',
  padding: 5
};

export default class InPlace extends Component {

  static propTypes = {
    component: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const component = this.props.component;
    const property = getInPlaceProperty(component.type);
    const value = component.properties[property];
    let { width, height, x, y } = component;
    width = Math.max(150, width);
    height = Math.max(150, height);
    return (
      <g transform={`translate(${x + 5}, ${y + 5})`}>
        <foreignObject width={width} height={height}>
          <textarea style={style} value={value} onChange={this.onChange}></textarea>
        </foreignObject>
      </g>
    );
  }

  onChange = (ev) => {
    const component = this.props.component;
    const property = getInPlaceProperty(component.type);
    this.props.onChange(component, property, ev.target.value);
  }
}
