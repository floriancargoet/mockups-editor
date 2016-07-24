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

function getZoomedMatrix(el, zoomX, zoomY, zoomFactor) {
  // from https://github.com/anvaka/panzoom (MIT)
  const transform = getTransform(el);
  const parent = el.ownerSVGElement;
  const parentCTM = parent.getScreenCTM();
  // we have consistent scale on both X and Y, thus we can use just one attribute:
  const scale = transform.matrix.a * zoomFactor;

  const x = zoomX * parentCTM.a - parentCTM.e;
  const y = zoomY * parentCTM.a - parentCTM.f;
  return [
    scale,
    transform.matrix.b,
    transform.matrix.c,
    scale,
    x - zoomFactor * (x - transform.matrix.e),
    y - zoomFactor * (y - transform.matrix.f)
  ];
}


export default class PanZoom extends Component {

  static propTypes = {
    zoomSpeed: PropTypes.number,
    panZoomMatrix: PropTypes.array.isRequired,
    onPanZoom: PropTypes.func.isRequired,
    onDoubleMiddleClick: PropTypes.func.isRequired,
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
      panning: false,
      minReached: false
    };
  }

  render() {
    const { panning } = this.state;
    const dragStyles = { cursor: panning ? 'move' : 'default' };
    const zoomTransform = 'matrix(' + this.props.panZoomMatrix.join(' ') + ')';

    return (
      <DraggableCore
        allowAnyClick // enable all buttons, filter in drag callbacks
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        handle={this.props.panHandle}
      >
        <g transform={zoomTransform} style={dragStyles}
          onDoubleClick={this.onDoubleClick}
          onWheel={this.onWheel}
        >
          {this.props.children}
        </g>
      </DraggableCore>
    );
  }

  onDoubleClick = (ev) => {
    if (ev.button !== 1) {
      return;
    }
    this.props.onDoubleMiddleClick();
  }

  onDragStart = (ev, { position }) => {
    if (ev.button !== 1) {
      ev.preventDefault();
      return;
    }

    this.setState({
      minReached: false,
      panning: true
    });
  }

  onDrag = (ev, { position }) => {
    if (ev.button !== 1) {
      ev.preventDefault();
      return;
    }

    const dx = position.deltaX;
    const dy = position.deltaY;

    let minReached = this.state.minReached;

    if (!minReached) {
      minReached = (dx * dx + dy * dy >= this.props.panMin * this.props.panMin);
    }
    else {
      const [a, b, c, d, e, f] = this.props.panZoomMatrix;
      const matrix = [a, b, c, d, e + dx, f + dy];
      this.props.onPanZoom(matrix);
    }

    this.setState({
      minReached: minReached
    });

  }

  onDragStop = (ev, { position }) => {
    this.setState({
      minReached: false,
      panning: false
    });
  }

  onWheel = (ev) => {
    const zoomFactor = getZoomFactor(ev.deltaY, this.props.zoomSpeed);
    const matrix = getZoomedMatrix(ev.currentTarget, ev.clientX, ev.clientY, zoomFactor);
    this.props.onPanZoom(matrix);
  }
}
