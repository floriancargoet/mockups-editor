import React from 'react';
import ComponentWrapper from './ComponentWrapper.jsx';
import GroupWrapper from './GroupWrapper.jsx';
import { DropTarget } from 'react-dnd';


const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    props.onComponentMoved(item.id, left, top);
  }
};

class ComponentsContainer extends React.Component {

  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,

    connectDropTarget: React.PropTypes.func.isRequired,
    components: React.PropTypes.array.isRequired,
    selection: React.PropTypes.array.isRequired,
    onComponentsContainerClicked: React.PropTypes.func.isRequired,
    onComponentResized: React.PropTypes.func.isRequired,
    onComponentMoved: React.PropTypes.func.isRequired,
    onComponentClicked: React.PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { connectDropTarget, onComponentsContainerClicked } = this.props;
    return connectDropTarget(
      <svg onClick={onComponentsContainerClicked}>
        { this.renderBackground() }
        { this.renderComponents(this.props.components) }
      </svg>
    );
  }

  renderBackground() {
    // the background forces the outer svg to fill the root
    return (
      <rect
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
        config: c,
        selected: this.props.selection.includes(id),
        onClick: (ev) => {
          ev.stopPropagation();
          this.props.onComponentClicked(id, ev);
        }
      };
      return c.type === '__Group__'
        ? <GroupWrapper {...props} />
        : <ComponentWrapper {...props} onResize={(ev, size) => this.onResize(id, size)} />;
    });
  }

  onResize = (id, size) => {
    this.props.onComponentResized(id, size);
  }
}

const DropTargetDecorator = DropTarget(['mockup-component', 'mockup-group'], boxTarget, connect => ({
  // injected props
  connectDropTarget: connect.dropTarget()
}));

export default DropTargetDecorator(ComponentsContainer);
