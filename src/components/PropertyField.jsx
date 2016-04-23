import React from 'react';

function renderEditor(type, value, onChange) {
  switch (type) {
    case 'Boolean':
      return <input type="checkbox" checked={value} onChange={ev => onChange(ev.target.checked)} />;
    case 'Number':
      return <input type="number" value={value} onChange={ev => onChange(Number(ev.target.value))} />;
    case 'String':
    default:
      return <input type="text" value={value} onChange={ev => onChange(String(ev.target.value))}/>;
  }
}

const PropertyField = ({ label, value, type, readOnly, onChange }) => (
  <div className="property-field">
    <label>{label}: </label>
    { readOnly
      ? <span>{value}</span>
      : renderEditor(type, value, onChange)
    }
  </div>
);

PropertyField.propTypes = {
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  readOnly: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

export default PropertyField;
