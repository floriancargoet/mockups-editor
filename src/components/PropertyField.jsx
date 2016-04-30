import React from 'react';
import * as editors from './property-editors';

function renderEditor(id, type, value, onChange) {
  switch (type) {
    case 'Boolean':
      return <input id={id} type="checkbox" checked={value} onChange={ev => onChange(ev.target.checked)} />;
    case 'Number':
      return <input id={id} type="number" value={value} onChange={ev => onChange(Number(ev.target.value))} />;
    case 'String':
    case undefined:
      return <input id={id} type="text" value={value} onChange={ev => onChange(String(ev.target.value))}/>;
    default:
      const Editor = editors[type];
      return <Editor id={id} value={value} onChange={onChange} />;
  }
}

const PropertyField = ({ id, label, value, type, readOnly, onChange }) => (
  <div className="property-field">
    <label htmlFor={id}>{label}: </label>
    { readOnly
      ? <span>{value}</span>
      : renderEditor(id, type, value, onChange)
    }
  </div>
);

PropertyField.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  readOnly: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

export default PropertyField;
