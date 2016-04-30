import React from 'react';

import PropertyField from './PropertyField.jsx';
import * as components from '../mockup-components';

function getEditorType(component, prop) {
  const Component = components[component.type];
  if (Component && Component.editors && Component.editors[prop]) {
    return Component.editors[prop];
  }
  return 'String';
}

const rootPropsEditors = {
  x: 'Number',
  y: 'Number',
  width: 'Number',
  height: 'Number',
  locked: 'Boolean'
};

const PropertyEditor = ({ component, onPropertyChange, onRootPropertyChange }) => {
  if (!component) {
    return (<div className="property-editor"></div>);
  }
  return (
    <div className="property-editor">
      {
        Object.keys(rootPropsEditors).map(prop => (
          <PropertyField
            key={prop} id={prop} label={prop}
            type={rootPropsEditors[prop]}
            value={component[prop]}
            onChange={value => onRootPropertyChange(component, prop, value)}
          />
        ))
      }
      {
        Object.keys(component.properties).map(prop => (
          <PropertyField
            key={prop} id={prop} label={prop}
            type={getEditorType(component, prop)}
            value={component.properties[prop]}
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
