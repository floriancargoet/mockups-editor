import React from 'react';

import PropertyField from './PropertyField.jsx';


const PropertyEditor = ({ component, onPropertyChange }) => {
  if (!component) {
    return (<div className="property-editor"></div>);
  }
  return (
    <div className="property-editor">
      <PropertyField label="X" value={component.x} readOnly/>
      <PropertyField label="Y" value={component.y} readOnly/>
      <PropertyField label="Width" value={component.width} readOnly/>
      <PropertyField label="Height" value={component.height} readOnly/>
      {
        Object.keys(component.properties).map(prop => (
          <PropertyField
            key={prop} label={prop} value={component.properties[prop]}
            onChange={ev => onPropertyChange(component, prop, ev.target.value)}
          />
        ))
      }
      <pre>
        {JSON.stringify(component, null, 2)}
      </pre>
    </div>
  );
};

PropertyEditor.propTypes = {
  component: React.PropTypes.object,
  onPropertyChange: React.PropTypes.func
};

export default PropertyEditor;
