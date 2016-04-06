import React from 'react';

import Button from './Button.jsx';

const Toolbar = ({ onButtonClicked, selection, selectionContainsGroup }) => {
  return (
    <div className="toolbar">
      <Button onClick={() => onButtonClicked('undo')}>Undo</Button>
      <Button onClick={() => onButtonClicked('redo')}>Redo</Button>
      <Button onClick={() => onButtonClicked('createBox')}>Box</Button>
      <Button onClick={() => onButtonClicked('createButton')}>Button</Button>
      <Button onClick={() => onButtonClicked('delete')} disabled={(selection.length === 0)}>Delete</Button>
      <Button onClick={() => onButtonClicked('group')} disabled={selection.length < 2}>Group</Button>
      <Button onClick={() => onButtonClicked('ungroup')} disabled={!selectionContainsGroup}>Ungroup</Button>
      <Button onClick={() => onButtonClicked('bring-to-top')} disabled={(selection.length === 0)}>Bring To Top</Button>
      <Button onClick={() => onButtonClicked('bring-up')} disabled={(selection.length === 0)}>Bring Up</Button>
      <Button onClick={() => onButtonClicked('push-down')} disabled={(selection.length === 0)}>Push Down</Button>
      <Button onClick={() => onButtonClicked('push-to-bottom')} disabled={(selection.length === 0)}>Push To Bottom</Button>
    </div>
  );
};

Toolbar.propTypes = {
  onButtonClicked: React.PropTypes.func.isRequired,
  selection: React.PropTypes.array.isRequired,
  selectionContainsGroup: React.PropTypes.bool.isRequired
};

export default Toolbar;
