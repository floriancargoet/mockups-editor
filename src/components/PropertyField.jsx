import React, { PropTypes } from 'react';
import * as editors from './property-editors';

function getEditor(editor) {
  if (typeof editor === 'string') {
    return { type: editor };
  }
  return editor;
}


const PropertyField = ({ id, label, value, editor, readOnly, onChange }) => {
  editor = getEditor(editor);
  const { type, ...config } = editor;
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
      return <Editor {...config} id={id} label={label} value={value} readOnly={readOnly} onChange={onChange} />;
  }
};

PropertyField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  editor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  value: PropTypes.any.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

export default PropertyField;
