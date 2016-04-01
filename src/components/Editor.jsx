import React from 'react';
import { DragDropContext } from 'react-dnd';
//import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { Layout, Fixed, Flex } from 'react-layout-pane';

import CustomDragLayer from './CustomDragLayer.jsx';

import Toolbar from '../containers/Toolbar';
import Workspace from '../containers/Workspace';
import PropertyEditor from '../containers/PropertyEditor';
import Debugger from '../containers/Debugger';

class Editor extends React.Component {
  render() {
    return (
      <div className="editor">
        <Layout type="column">
          <Fixed style={{ height: 20 }}><Toolbar /></Fixed>
          <Fixed style={{ height: 150 }}><Debugger /></Fixed>
          <Flex>
            <Layout type="row">
              <Flex style={{ height: '100%' }}>
                <Workspace />
                <CustomDragLayer />
              </Flex>
              <Fixed style={{ width: 250 }}><PropertyEditor /></Fixed>
            </Layout>
          </Flex>
        </Layout>
      </div>
    );
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Editor);
