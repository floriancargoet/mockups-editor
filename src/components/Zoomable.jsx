import React, { Component, PropTypes } from 'react';
import { DraggableCore } from 'react-draggable';

function getZoomFactor(delta, speed) {
  let zoomFactor = 1;
  if (delta > 0) { // zoom out
    zoomFactor = (1 - speed);
  }
  else if (delta < 0) { // zoom in
    zoomFactor = (1 + speed);
  }
  return zoomFactor;
}

function getTransform(el) {
  // from https://github.com/anvaka/panzoom (MIT)
  const baseVal = el.transform.baseVal;
  if (baseVal.numberOfItems) {
    return baseVal.getItem(0);
  }
  const owner = el.ownerSVGElement || el;
  const transform = owner.createSVGTransform();
  el.transform.baseVal.appendItem(transform);

  return transform;
}

function getZoomTransform(el, zoomX, zoomY, zoomFactor) {
  // from https://github.com/anvaka/panzoom (MIT)
  const transform = getTransform(el);
  const parent = el.ownerSVGElement;
  const parentCTM = parent.getScreenCTM();
  // we have consistent scale on both X and Y, thus we can use just one attribute:
  const scale = transform.matrix.a * zoomFactor;

  const x = zoomX * parentCTM.a - parentCTM.e;
  const y = zoomY * parentCTM.a - parentCTM.f;

  return {
    scale,
    transform: 'matrix(' + [
      scale,
      transform.matrix.b,
      transform.matrix.c,
      scale,
      x - zoomFactor * (x - transform.matrix.e),
      y - zoomFactor * (y - transform.matrix.f)
    ].join(' ') + ')'
  };
}

export default class Zoomable extends Component {

  static propTypes = {
    speed: PropTypes.number,
    onZoom: PropTypes.func,
    handle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    speed: 0.065
  }

  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: '',
      panX: 0,
      panY: 0
    };
  }

  render() {
    const { zoomTransform, panX, panY } = this.state;
    return (
      <DraggableCore
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        handle={this.props.handle}
      >
        <g transform={`translate(${panX}, ${panY})`}>
          <g transform={zoomTransform} onWheel={this.onWheel}>
            {this.props.children}
          </g>
        </g>
      </DraggableCore>
    );
  }

  onDragStart = (ev, { position }) => {
    this.startX = position.clientX;
    this.startY = position.clientY;
    this.oldPanX = this.state.panX;
    this.oldPanY = this.state.panY;
  }

  onDrag = (ev, { position }) => {
    const dx = position.clientX - this.startX;
    const dy = position.clientY - this.startY;

    this.setState({
      panX: this.oldPanX + dx,
      panY: this.oldPanY + dy
    });
  }

  onDragStop = (ev, { position }) => {
    delete this.startX;
    delete this.startY;
    delete this.oldPanX;
    delete this.oldPanY;
  }

  onWheel = (ev) => {
    const zoomX = ev.clientX - this.state.panX;
    const zoomY = ev.clientY - this.state.panY;
    const zoomFactor = getZoomFactor(ev.deltaY, this.props.speed);

    const { scale, transform } = getZoomTransform(ev.currentTarget, zoomX, zoomY, zoomFactor);
    this.setState({
      zoomTransform: transform
    });
    if (this.props.onZoom) {
      this.props.onZoom({ zoomFactor: scale }); // cumulative factor
    }
  }
}
