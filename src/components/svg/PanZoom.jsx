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

function getZoomMatrix(el, zoomX, zoomY, zoomFactor) {
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
    zoomMatrix: PropTypes.array.isRequired,
    onZoom: PropTypes.func.isRequired,
    onPan: PropTypes.func.isRequired,
    onDoubleMiddleClick: PropTypes.func.isRequired,
    panMin: PropTypes.number,
    panX: PropTypes.number.isRequired,
    panY: PropTypes.number.isRequired,
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
      startX: 0,
      startY: 0,
      panX: props.panX,
      panY: props.panY,
      oldPanX: 0,
      oldPanY: 0,
      minReached: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      panX: nextProps.panX,
      panY: nextProps.panY
    });
  }

  render() {
    const { panX, panY, panning } = this.state;
    const dragStyles = { cursor: panning ? 'move' : 'default' };
    const zoomTransform = 'matrix(' + this.props.zoomMatrix.join(' ') + ')';

    return (
      <DraggableCore
        allowAnyClick // enable all buttons, filter in drag callbacks
        onStart={this.onDragStart}
        onDrag={this.onDrag}
        onStop={this.onDragStop}
        handle={this.props.panHandle}
      >
        <g transform={`translate(${panX}, ${panY})`} style={dragStyles} onDoubleClick={this.onDoubleClick}>
          <g transform={zoomTransform} onWheel={this.onWheel}>
            {this.props.children}
          </g>
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

    let minReached = this.state.minReached;

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
    const { panX, panY } = this.state;
    this.props.onPan(panX, panY);
  }

  onWheel = (ev) => {
    const zoomX = ev.clientX - this.state.panX;
    const zoomY = ev.clientY - this.state.panY;
    const zoomFactor = getZoomFactor(ev.deltaY, this.props.zoomSpeed);

    const matrix = getZoomMatrix(ev.currentTarget, zoomX, zoomY, zoomFactor);
    this.props.onZoom(matrix);
  }
}
