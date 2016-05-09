import React from 'react';
import { Layout, Fixed, Flex } from 'react-layout-pane';

import Toolbar from '../connectors/Toolbar';
import MockupSelector from '../connectors/MockupSelector';
import Workspace from './svg/Workspace.jsx';
import PropertyEditor from '../connectors/PropertyEditor';

export default class Editor extends React.Component {
  render() {
    return (
      <div className="editor">
        <Layout type="column">
          <Fixed><Toolbar /></Fixed>
          <Flex>
            <Layout type="not-column">{/* FIXME: 'row' conflicts with boostrap */}
              <Fixed style={{ padding: '0 5px' }}><MockupSelector /></Fixed>
              <Flex style={{ height: '100%', overflow: 'hidden' /* fix SVG quirk */ }}>
                <Workspace />
              </Flex>
              <Fixed style={{ width: 450 }}>
                <PropertyEditor />
              </Fixed>
            </Layout>
          </Flex>
        </Layout>
      </div>
    );
  }
}
