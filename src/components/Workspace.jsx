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

class Workspace extends React.Component {

  static propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    components: React.PropTypes.array.isRequired,
    selection: React.PropTypes.array.isRequired,
    onWorkspaceClicked: React.PropTypes.func.isRequired,
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
    const { connectDropTarget, onWorkspaceClicked } = this.props;
    return connectDropTarget(
      <div className="workspace" onClick={onWorkspaceClicked}>
        { this.renderComponents(this.props.components) }
      </div>
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
        : <ComponentWrapper {...props} onResize={(ev, { size }) => this.onResize(id, size)} />;
    });
  }

  onResize = (id, size) => {
    this.props.onComponentResized(id, size.width, size.height);
  }
}

const DropTargetDecorator = DropTarget('mockup-component', boxTarget, connect => ({
  // injected props
  connectDropTarget: connect.dropTarget()
}));

export default DropTargetDecorator(Workspace);
