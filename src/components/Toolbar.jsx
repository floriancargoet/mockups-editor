import React, { Component, PropTypes } from 'react';
import { Dropdown, DropdownButton, MenuItem, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Icon, SR } from './helpers.jsx';
import * as components from '../mockup-components';

const toolbarStyle = {
  margin: 5
};

export default class Toolbar extends Component {

  static propTypes = {
    undoableActions: PropTypes.array.isRequired,
    redoableActions: PropTypes.array.isRequired,
    onButtonClicked: PropTypes.func.isRequired,
    selection: PropTypes.array.isRequired,
    selectionContainsGroup: PropTypes.bool.isRequired
  }

  render() {
    const { onButtonClicked, selection, selectionContainsGroup } = this.props;

    return (
      <ButtonToolbar style={toolbarStyle}>

        <ButtonGroup>
          {this.renderUndoButton()}
          {this.renderRedoButton()}
        </ButtonGroup>

        <DropdownButton id="add-component" title={<span><Icon name="fa-plus" /> Add component</span>}>
          {
            Object.keys(components).map(componentName => (
              <MenuItem key={componentName} onClick={() => onButtonClicked('create', components[componentName])}>{componentName}</MenuItem>
            ))
          }
        </DropdownButton>

        <Button onClick={() => onButtonClicked('duplicate')}><Icon name="fa-clone" /> Duplicate</Button>
        <Button onClick={() => onButtonClicked('delete')} disabled={(selection.length === 0)} bsStyle="danger"><Icon name="fa-trash-o" /> Delete</Button>

        <ButtonGroup>
          <Button onClick={() => onButtonClicked('group')} disabled={selection.length < 2}><Icon name="fa-object-group" /> Group</Button>
          <Button onClick={() => onButtonClicked('ungroup')} disabled={!selectionContainsGroup}><Icon name="fa-object-ungroup" /> Ungroup</Button>
        </ButtonGroup>

        <ButtonGroup>
          <Button onClick={() => onButtonClicked('bring-to-top')} disabled={(selection.length === 0)}>Bring To Top</Button>
          <Button onClick={() => onButtonClicked('bring-up')} disabled={(selection.length === 0)}>Bring Up</Button>
          <Button onClick={() => onButtonClicked('push-down')} disabled={(selection.length === 0)}>Push Down</Button>
          <Button onClick={() => onButtonClicked('push-to-bottom')} disabled={(selection.length === 0)}>Push To Bottom</Button>
        </ButtonGroup>

      </ButtonToolbar>
    );
  }

  renderUndoButton() {
    const { onButtonClicked, undoableActions } = this.props;
    const title = undoableActions.length === 0 ? 'Nothing to undo' : `Undo "${undoableActions[0].name}"`;
    const disabled = (undoableActions.length === 0);
    return (
      <Dropdown id="undo-actions">
        <Button
          title={title} disabled={disabled}
          onClick={() => onButtonClicked('undo')}
        >
          <Icon name="fa-undo" />
          <SR>Undo</SR>
        </Button>
        <Dropdown.Toggle disabled={disabled}/>
        <Dropdown.Menu>
        {
          undoableActions.map((action, i) => (
            <MenuItem key={i} onClick={() => onButtonClicked('undo-jump', i)}>Undo "{action.name}"</MenuItem>
          ))
        }
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  renderRedoButton() {
    const { onButtonClicked, redoableActions } = this.props;
    const title = redoableActions.length === 0 ? 'Nothing to redo' : `Redo "${redoableActions[0].name}"`;
    const disabled = (redoableActions.length === 0);
    return (
      <Dropdown id="redo-actions">
        <Button
          title={title} disabled={disabled}
          onClick={() => onButtonClicked('redo')}
        >
          <Icon name="fa-repeat" />
          <SR>Redo</SR>
        </Button>
        <Dropdown.Toggle disabled={disabled}/>
        <Dropdown.Menu>
        {
          redoableActions.map((action, i) => (
            <MenuItem key={i} onClick={() => onButtonClicked('redo-jump', i)}>Redo "{action.name}"</MenuItem>
          ))
        }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
};
