import React from 'react';

import PropertyField from './PropertyField.jsx';


const PropertyEditor = ({ component, onPropertyChange, onRootPropertyChange }) => {
  if (!component) {
    return (<div className="property-editor"></div>);
  }
  return (
    <div className="property-editor">
      {
        ['x', 'y', 'width', 'height'].map(prop => (
          <PropertyField
            key={prop} label={prop} value={component[prop]}
            onChange={ev => onRootPropertyChange(component, prop, Number(ev.target.value))}
          />
        ))
      }
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
  onPropertyChange: React.PropTypes.func,
  onRootPropertyChange: React.PropTypes.func
};

export default PropertyEditor;
