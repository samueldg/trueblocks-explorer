import React, { useState } from 'react';

import 'antd/dist/antd.css';
import './App.css';

import { Layout, Tabs } from 'antd';
import { Routes } from './Routes';
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

export const App = () => {
  const [menuExpanded, setMenuExpanded] = useState(true);
  const [statusExpanded, setStatusExpanded] = useState(true);
  const [helpExpanded, setHelpExpanded] = useState(true);

  return (
    <Layout>
      <Header className="app-header">TrueBlocks Account Explorer</Header>
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
            <Content style={{ backgroundColor: 'white', padding: '1rem' }}>
              {/* View */}

              {/* TODO: move it */}
              <Routes />
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
