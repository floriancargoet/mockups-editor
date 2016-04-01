import React from 'react';
import { Layout, Fixed, Flex } from 'react-layout-pane';

import Toolbar from '../containers/Toolbar';
import Workspace from './Workspace.jsx';
import PropertyEditor from '../containers/PropertyEditor';
import Debugger from '../containers/Debugger';

export default class Editor extends React.Component {
  render() {
    return (
      <div className="editor">
        <Layout type="column">
          <Fixed style={{ height: 20 }}><Toolbar /></Fixed>
          <Fixed style={{ height: 150 }}><Debugger /></Fixed>
          <Flex>
            <Layout type="row">
              <Flex style={{ height: '100%', overflow: 'hidden' /* fix SVG quirk */ }}>
                <Workspace />
              </Flex>
              <Fixed style={{ width: 250 }}><PropertyEditor /></Fixed>
            </Layout>
          </Flex>
        </Layout>
      </div>
    );
  }
}
