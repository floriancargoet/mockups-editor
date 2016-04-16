import React from 'react';

import PropertyField from './PropertyField.jsx';
import * as components from '../mockup-components/all';

function getEditorType(component, prop) {
  const Component = components[component.type];
  if (Component && Component.editors && Component.editors[prop]) {
    return Component.editors[prop];
  }
  return 'String';
}

const PropertyEditor = ({ component, onPropertyChange, onRootPropertyChange }) => {
  if (!component) {
    return (<div className="property-editor"></div>);
  }
  return (
    <div className="property-editor">
      {
        ['x', 'y', 'width', 'height'].map(prop => (
          <PropertyField
            key={prop} label={prop} value={component[prop]} type="Number"
            onChange={value => onRootPropertyChange(component, prop, value)}
          />
        ))
      }
      {
        Object.keys(component.properties).map(prop => (
          <PropertyField
            key={prop} label={prop} value={component.properties[prop]} type={getEditorType(component, prop)}
            onChange={value => onPropertyChange(component, prop, value)}
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
