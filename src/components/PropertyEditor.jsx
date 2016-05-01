import React, { PropTypes, Component } from 'react';
import { Form, Button, Grid } from 'react-bootstrap';

import PropertyField from './PropertyField.jsx';
import * as components from '../mockup-components';

function getEditorType(component, prop) {
  const MockupComponent = components[component.type];
  if (MockupComponent && MockupComponent.editors && MockupComponent.editors[prop]) {
    return MockupComponent.editors[prop];
  }
  return 'String';
}

const rootPropsEditors = [
  { prop: 'locked', editor: 'Lock' },
  { prop: 'x', editor: 'Number' },
  { prop: 'y', editor: 'Number' },
  { prop: 'width', editor: 'Number' },
  { prop: 'height', editor: 'Number' }
];

class PropertyEditor extends Component {

  static propTypes = {
    component: PropTypes.object,
    onPropertyChange: PropTypes.func,
    onRootPropertyChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      debug: false
    };
  }

  render() {
    const { component, onPropertyChange, onRootPropertyChange } = this.props;
    const { debug } = this.state;

    if (!component) {
      return (<div className="property-editor"></div>);
    }

    // resizing constraints
    const widthRO = (component.resize === 'vertical');
    const heightRO = (component.resize === 'horizontal');

    return (
      <div className="property-editor">
        <Grid fluid>
          <Form horizontal>
            <h2>{component.type}</h2>
            {
              rootPropsEditors.map(({ prop, editor }) => (
                <PropertyField
                  key={prop} id={prop} label={prop}
                  type={editor}
                  value={component[prop]}
                  readOnly={(component.locked && prop !== 'locked') || (widthRO && prop === 'width') || (heightRO && prop === 'height') }
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
                  readOnly={component.locked}
                  onChange={value => onPropertyChange(component, prop, value)}
                />
              ))
            }
            <Button onClick={this.onDebugClick}>Debug Info</Button>
            {
              debug
                ? <pre>
                    {JSON.stringify(component, null, 2)}
                  </pre>
                : null
            }
          </Form>
        </Grid>
      </div>
    );
  }

  onDebugClick = () => {
    this.setState({
      debug: !(this.state.debug)
    });
  }
};


export default PropertyEditor;
