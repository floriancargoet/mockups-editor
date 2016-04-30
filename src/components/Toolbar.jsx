import React from 'react';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';
import * as components from '../mockup-components';

const buttonStyle = {
  margin: 5
};



const Toolbar = ({ onButtonClicked, selection, selectionContainsGroup }) => {
  return (
    <div className="toolbar">
      <Button style={buttonStyle} onClick={() => onButtonClicked('undo')}>Undo</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('redo')}>Redo</Button>
      <DropdownButton title="Add component">
        {
          Object.keys(components).map(componentName => (
            <MenuItem onClick={() => onButtonClicked('create', components[componentName])}>{componentName}</MenuItem>
          ))
        }
      </DropdownButton>
      <Button style={buttonStyle} onClick={() => onButtonClicked('duplicate')}>Duplicate</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('delete')} disabled={(selection.length === 0)}>Delete</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('group')} disabled={selection.length < 2}>Group</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('ungroup')} disabled={!selectionContainsGroup}>Ungroup</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('bring-to-top')} disabled={(selection.length === 0)}>Bring To Top</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('bring-up')} disabled={(selection.length === 0)}>Bring Up</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('push-down')} disabled={(selection.length === 0)}>Push Down</Button>
      <Button style={buttonStyle} onClick={() => onButtonClicked('push-to-bottom')} disabled={(selection.length === 0)}>Push To Bottom</Button>
    </div>
  );
};

Toolbar.propTypes = {
  onButtonClicked: React.PropTypes.func.isRequired,
  selection: React.PropTypes.array.isRequired,
  selectionContainsGroup: React.PropTypes.bool.isRequired
};

export default Toolbar;
