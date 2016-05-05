import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import ComponentWrapper from './ComponentWrapper.jsx';
import GroupWrapper from './GroupWrapper.jsx';
import { getPossibleAlignments, applyAlignments } from '../../util/alignement';


class ComponentsContainer extends Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    zoomFactor: PropTypes.number.isRequired,

    connectDropTarget: PropTypes.func.isRequired,
    components: PropTypes.array.isRequired,
    selection: PropTypes.array.isRequired,
    onBackgroundClicked: PropTypes.func.isRequired,
    onComponentResized: PropTypes.func.isRequired,
    onComponentMoved: PropTypes.func.isRequired,
    onComponentMouseDown: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return this.props.connectDropTarget(
      <svg>
        { this.renderBackground() }
        { this.renderComponents(this.props.components) }
      </svg>
    );
  }

  renderBackground() {
    // the background forces the outer svg to fill the root
    return (
      <rect
        className="background"
        onClick={this.props.onBackgroundClicked}
        x={0} y={0}
        width="100%" height="100%"
        fill="#eee"
      />
    );
  }

  renderComponents(components) {
    return components.map(c => {
      const id = c.id;
      const props = {
        key: id,
        id: id,
        component: c,
        selected: this.props.selection.includes(id),
        onMouseDown: (ev) => {
          this.props.onComponentMouseDown(id, ev);
        }
      };
      return c.type === '__Group__'
        ? <GroupWrapper {...props} />
        : <ComponentWrapper {...props}
            onResize={(size) => this.onResize(id, size)}
            zoomFactor={this.props.zoomFactor}
          />;
    });
  }

  onResize = (id, size) => {
    this.props.onComponentResized(id, size);
  }
}


const componentsTarget = {
  drop(props, monitor) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    let offsetX = delta.x / props.zoomFactor;
    let offsetY = delta.y / props.zoomFactor;

    const alignments = getPossibleAlignments(offsetX, offsetY, item.component, props.components);
    ({ offsetX, offsetY } = applyAlignments(offsetX, offsetY, alignments, item.component));

    const x = Math.round(item.x + offsetX);
    const y = Math.round(item.y + offsetY);
    props.onComponentMoved(item.id, x, y);
  }
};

const DropTargetDecorator = DropTarget(['mockup-component', 'mockup-group'], componentsTarget, connect => ({
  // injected props
  connectDropTarget: connect.dropTarget()
}));

export default DropTargetDecorator(ComponentsContainer);
