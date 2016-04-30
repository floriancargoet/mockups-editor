import React from 'react';
import { DropdownButton, MenuItem, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Icon, SR } from './helpers.jsx';

import * as components from '../mockup-components';

const toolbarStyle = {
  margin: 5
};

const Toolbar = ({ onButtonClicked, selection, selectionContainsGroup }) => {
  return (
    <ButtonToolbar style={toolbarStyle}>

      <ButtonGroup>
        <Button onClick={() => onButtonClicked('undo')}>
          <Icon name="fa-undo" title="Undo" />
          <SR>Undo</SR>
        </Button>
        <Button onClick={() => onButtonClicked('redo')}>
          <Icon name="fa-repeat" title="Redo" />
          <SR>Redo</SR>
        </Button>
      </ButtonGroup>

      <DropdownButton title={<span><Icon name="fa-plus" /> Add component</span>}>
        {
          Object.keys(components).map(componentName => (
            <MenuItem onClick={() => onButtonClicked('create', components[componentName])}>{componentName}</MenuItem>
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
};

Toolbar.propTypes = {
  onButtonClicked: React.PropTypes.func.isRequired,
  selection: React.PropTypes.array.isRequired,
  selectionContainsGroup: React.PropTypes.bool.isRequired
};

export default Toolbar;
