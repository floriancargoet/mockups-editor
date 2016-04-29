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

export default class PanZoom extends Component {

  static propTypes = {
    zoomSpeed: PropTypes.number,
    onZoom: PropTypes.func,
    panMin: PropTypes.number,
    panHandle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    zoomSpeed: 0.065,
    panMin: 0
  }

  constructor(props) {
    super(props);
    this.state = {
      zoomTransform: '',
      panX: 0,
      panY: 0,
      panning: false,
      startX: 0,
      startY: 0,
      oldPanX: 0,
      oldPanY: 0,
      minReached: false
    };
  }

  render() {
    const { zoomTransform, panX, panY, panning } = this.state;
    const dragStyles = { cursor: panning ? "move" : "default" };
    return (
      <DraggableCore
        allowAnyClick // enable all buttons, filter in drag callbacks
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        handle={this.props.panHandle}
      >
        <g transform={`translate(${panX}, ${panY})`} style={dragStyles}>
          <g transform={zoomTransform} onWheel={this.onWheel}>
            {this.props.children}
          </g>
        </g>
      </DraggableCore>
    );
  }

  onDragStart = (ev, { position }) => {
    if (ev.button !== 1) {
      ev.preventDefault();
      return;
    }

    this.setState({
      startX: position.clientX,
      startY: position.clientY,
      oldPanX: this.state.panX,
      oldPanY: this.state.panY,
      minReached: false,
      panning: true
    });
  }

  onDrag = (ev, { position }) => {
    if (ev.button !== 1) {
      ev.preventDefault();
      return;
    }
    const dx = position.clientX - this.state.startX;
    const dy = position.clientY - this.state.startY;

    let minReached = this.state.minReached

    if (!minReached) {
      minReached = (dx * dx + dy * dy >= this.props.panMin * this.props.panMin);
    }

    if (minReached) {
      this.setState({
        panX: this.state.oldPanX + dx,
        panY: this.state.oldPanY + dy,
        minReached: minReached
      });
    }
    else {
      this.setState({
        minReached: minReached
      });
    }
  }

  onDragStop = (ev, { position }) => {
    this.setState({
      startX: 0,
      startY: 0,
      oldPanX: 0,
      oldPanY: 0,
      minReached: false,
      panning: false
    });
  }

  onWheel = (ev) => {
    const zoomX = ev.clientX - this.state.panX;
    const zoomY = ev.clientY - this.state.panY;
    const zoomFactor = getZoomFactor(ev.deltaY, this.props.zoomSpeed);

    const { scale, transform } = getZoomTransform(ev.currentTarget, zoomX, zoomY, zoomFactor);
    this.setState({
      zoomTransform: transform
    });
    if (this.props.onZoom) {
      this.props.onZoom({ zoomFactor: scale }); // cumulative factor
    }
  }
}
