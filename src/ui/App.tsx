import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './app.css';

import { Button, Layout, notification } from 'antd';
import { createErrorNotification } from './modules/error_notification';
import { MainMenu } from './components/MainMenu';
import {
  SidePanel,
  PanelDirection,
} from './components/SidePanels/SidePanel';
import {
  StatusPanel,
} from './components/SidePanels/StatusPanel';

const {
  Header,
  Footer,
  Content,
} = Layout;

const showError = () => notification.error(
  createErrorNotification({ description: 'Just testing' }),
);

export const App = () => {
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [helpExpanded, setHelpExpanded] = useState(true);

  return (
    <Layout>
      <Header>TrueBlocks Account Explorer</Header>
      <Layout>
        <SidePanel
          header="Main menu"
          dir={PanelDirection.Left}
          expanded={menuExpanded}
          onToggle={setMenuExpanded}
          collapsibleContent={false}
        >
          <MainMenu />
        </SidePanel>
        <Layout>
          <Layout>
            <Content>
              Hello World
              <Button type="primary" onClick={showError}>Error</Button>
            </Content>
            <SidePanel
              header="Status"
              expanded={statusExpanded}
              onToggle={setStatusExpanded}
              dir={PanelDirection.Right}
            >
              <StatusPanel />
            </SidePanel>
            <SidePanel
              header="Help"
              expanded={helpExpanded}
              onToggle={setHelpExpanded}
              dir={PanelDirection.Right}
            >
              Help
            </SidePanel>
          </Layout>
          <Footer>
            Footer
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
