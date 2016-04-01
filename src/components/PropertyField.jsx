import React from 'react';

const PropertyField = ({ label, value, readOnly, onChange }) => (
  <div className="property-field">
    <label>{label}: </label>
    { readOnly
      ? <span>{value}</span>
      : <input value={value} onChange={onChange}/>
    }
  </div>
);

PropertyField.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired,
  readOnly: React.PropTypes.bool,
  onChange: React.PropTypes.func
};

export default PropertyField;
