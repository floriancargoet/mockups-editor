import React, { PropTypes } from 'react';
import * as editors from './property-editors';

const PropertyField = ({ id, label, value, type, readOnly, onChange }) => {
  switch (type) {
    case undefined:
      return (
        <div className="property-field">
          <label htmlFor={id}>{label}: </label>
          { readOnly
            ? <span>{value}</span>
            : <input id={id} type="text" value={value} onChange={ev => onChange(String(ev.target.value))}/>
          }
        </div>
      );
    default:
      const Editor = editors[type];
      return <Editor id={id} label={label} value={value} readOnly={readOnly} onChange={onChange} />;
  }
};

PropertyField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default PropertyField;
