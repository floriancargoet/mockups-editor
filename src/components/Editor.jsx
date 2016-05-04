import React from 'react';
import { Layout, Fixed, Flex } from 'react-layout-pane';

import Toolbar from '../containers/Toolbar';
import MockupSelector from '../containers/MockupSelector';
import Workspace from './Workspace.jsx';
import PropertyEditor from '../containers/PropertyEditor';
import Debugger from '../containers/Debugger';

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
                <Debugger />
                <PropertyEditor />
              </Fixed>
            </Layout>
          </Flex>
        </Layout>
      </div>
    );
  }
}
